import uuid
import base64
import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Payment, PaymentGateway
from .services import PaymentGatewayFactory
from .serializers import PaymentSerializer, PaymentGatewaySerializer

logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_available_gateways(request):
    """Get list of available payment gateways"""
    gateway_list = [
        {
            'id': 'phonepe',
            'name': 'PhonePe',
            'display_name': 'PhonePe',
            'icon': 'phonepe',
            'description': 'Pay using PhonePe UPI, cards, or net banking',
            'supports_upi': True,
            'supports_cards': True,
            'supports_netbanking': True,
            'is_active': True,
            'is_default': True,
        },
        {
            'id': 'razorpay',
            'name': 'Razorpay',
            'display_name': 'Razorpay',
            'icon': 'razorpay',
            'description': 'Pay using Razorpay - UPI, cards, wallets & more',
            'supports_upi': True,
            'supports_cards': True,
            'supports_netbanking': True,
            'supports_wallets': True,
            'is_active': False,
            'coming_soon': True,
        },
    ]
    
    return Response({
        'success': True,
        'gateways': gateway_list
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    """Initiate a payment with selected gateway"""
    data = request.data
    
    gateway_name = data.get('gateway', 'phonepe')
    amount = data.get('amount')
    batch_id = data.get('batch_id')
    
    if not amount or not batch_id:
        return Response({
            'success': False,
            'error': 'Amount and batch_id are required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        amount = float(amount)
    except ValueError:
        return Response({
            'success': False,
            'error': 'Invalid amount'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    base_url = request.build_absolute_uri('/').rstrip('/')
    redirect_url = f"{base_url}/api/payments/callback/"
    callback_url = f"{base_url}/api/payments/webhook/"
    
    try:
        service = PaymentGatewayFactory.get_service(gateway_name)
    except ValueError as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
    
    result = service.initiate_payment(
        amount=amount,
        user_id=request.user.id,
        batch_id=batch_id,
        redirect_url=redirect_url,
        callback_url=callback_url
    )
    
    if result.get('coming_soon'):
        return Response({
            'success': False,
            'error': f'{gateway_name.title()} integration is coming soon!',
            'coming_soon': True
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if result.get('success'):
        transaction_id = f"TXN{uuid.uuid4().hex[:16].upper()}"
        
        Payment.objects.create(
            student=request.user,
            amount=amount,
            payment_method=gateway_name,
            status='pending',
            transaction_id=transaction_id,
            merchant_transaction_id=result.get('merchant_transaction_id'),
            gateway_response=result.get('response')
        )
        
        return Response({
            'success': True,
            'payment_url': result.get('payment_url'),
            'transaction_id': transaction_id
        })
    else:
        logger.error(f"Payment initiation failed: {result.get('error')}")
        return Response({
            'success': False,
            'error': result.get('error', 'Payment initiation failed')
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@require_http_methods(["POST"])
def payment_callback(request):
    """Handle redirect after payment completion"""
    transaction_id = request.POST.get('transactionId') or request.POST.get('merchantTransactionId')
    
    if transaction_id:
        try:
            payment = Payment.objects.get(merchant_transaction_id=transaction_id)
            
            service = PaymentGatewayFactory.get_service(payment.payment_method)
            status_result = service.check_status(transaction_id)
            
            if status_result.get('success'):
                payment_data = status_result.get('data', {})
                state = payment_data.get('state', 'UNKNOWN')
                
                if state == 'COMPLETED':
                    payment.status = 'completed'
                    payment.payment_date = timezone.now()
                    payment.gateway_transaction_id = payment_data.get('transactionId')
                elif state == 'FAILED':
                    payment.status = 'failed'
                    payment.failed_reason = payment_data.get('message', 'Payment failed')
                else:
                    payment.status = 'processing'
                
                payment.gateway_response = status_result
                payment.save()
                
                logger.info(f"Payment callback processed for {transaction_id}: {state}")
        except Payment.DoesNotExist:
            logger.warning(f"Payment not found for callback: {transaction_id}")
    
    return JsonResponse({
        'status': 'received',
        'message': 'Payment callback processed'
    })


@csrf_exempt
@require_http_methods(["POST"])
def payment_webhook(request):
    """Server-to-server webhook from payment gateway - WITH SIGNATURE VERIFICATION"""
    try:
        x_verify_header = request.headers.get('X-VERIFY', '')
        response_b64 = request.POST.get('response', '')
        
        if not response_b64 or not x_verify_header:
            logger.warning("Webhook received without proper headers or response")
            return JsonResponse({'error': 'Invalid webhook request'}, status=400)
        
        try:
            service = PaymentGatewayFactory.get_service('phonepe')
        except ValueError:
            logger.error("Failed to initialize PhonePe service for webhook verification")
            return JsonResponse({'error': 'Service unavailable'}, status=500)
        
        if not service.verify_webhook(response_b64, x_verify_header):
            logger.warning(f"Webhook signature verification failed. X-VERIFY: {x_verify_header[:20]}...")
            return JsonResponse({'error': 'Invalid signature'}, status=403)
        
        try:
            response_json = base64.b64decode(response_b64).decode()
            response_data = json.loads(response_json)
        except (ValueError, json.JSONDecodeError) as e:
            logger.error(f"Failed to decode webhook payload: {e}")
            return JsonResponse({'error': 'Invalid payload'}, status=400)
        
        merchant_transaction_id = response_data.get('merchantTransactionId')
        
        if merchant_transaction_id:
            try:
                payment = Payment.objects.get(merchant_transaction_id=merchant_transaction_id)
                
                code = response_data.get('code', '')
                if code == 'PAYMENT_SUCCESS':
                    payment.status = 'completed'
                    payment.payment_date = timezone.now()
                    logger.info(f"Payment completed via webhook: {merchant_transaction_id}")
                elif code == 'PAYMENT_ERROR':
                    payment.status = 'failed'
                    payment.failed_reason = response_data.get('message', 'Payment error')
                    logger.info(f"Payment failed via webhook: {merchant_transaction_id}")
                
                payment.gateway_response = response_data
                payment.save()
            except Payment.DoesNotExist:
                logger.warning(f"Payment not found for webhook: {merchant_transaction_id}")
        
        return JsonResponse({'status': 'success'})
    except Exception as e:
        logger.exception(f"Webhook processing error: {e}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_payment_status(request, transaction_id):
    """Check payment status by transaction ID"""
    try:
        payment = Payment.objects.get(
            transaction_id=transaction_id,
            student=request.user
        )
        
        if payment.status == 'pending' and payment.merchant_transaction_id:
            try:
                service = PaymentGatewayFactory.get_service(payment.payment_method)
                status_result = service.check_status(payment.merchant_transaction_id)
                
                if status_result.get('success'):
                    payment_data = status_result.get('data', {})
                    state = payment_data.get('state', 'UNKNOWN')
                    
                    if state == 'COMPLETED':
                        payment.status = 'completed'
                        payment.payment_date = timezone.now()
                    elif state == 'FAILED':
                        payment.status = 'failed'
                    
                    payment.gateway_response = status_result
                    payment.save()
            except Exception as e:
                logger.error(f"Status check failed: {e}")
        
        return Response({
            'success': True,
            'payment': PaymentSerializer(payment).data
        })
    except Payment.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Payment not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_payments(request):
    """Get payment history for current user"""
    payments = Payment.objects.filter(student=request.user)
    serializer = PaymentSerializer(payments, many=True)
    
    return Response({
        'success': True,
        'payments': serializer.data
    })
