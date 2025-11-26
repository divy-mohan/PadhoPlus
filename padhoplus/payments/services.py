import os
import base64
import hashlib
import json
import uuid
import requests
from datetime import datetime


class PhonePePaymentService:
    """PhonePe Payment Gateway Service"""
    
    def __init__(self):
        self.client_id = os.environ.get('PHONEPE_CLIENT_ID')
        self.client_secret = os.environ.get('PHONEPE_CLIENT_SECRET')
        self.mode = os.environ.get('PHONEPE_MODE', 'UAT')
        
        self.api_urls = {
            'UAT': 'https://api-preprod.phonepe.com/apis/pg-sandbox',
            'PRODUCTION': 'https://api.phonepe.com/apis/hermes'
        }
        
        if not self.client_id or not self.client_secret:
            raise ValueError("PhonePe credentials not configured. Set PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET environment variables.")
        
    def get_base_url(self):
        return self.api_urls.get(self.mode, self.api_urls['UAT'])
    
    def generate_checksum(self, payload_b64, endpoint):
        """Generate X-VERIFY checksum for PhonePe API"""
        checksum_string = f"{payload_b64}{endpoint}{self.client_secret}"
        checksum = hashlib.sha256(checksum_string.encode()).hexdigest()
        return f"{checksum}###1"
    
    def initiate_payment(self, amount, user_id, batch_id, redirect_url, callback_url):
        """Initiate a PhonePe payment"""
        merchant_transaction_id = f"MT{uuid.uuid4().hex[:20]}"
        merchant_user_id = f"USER{user_id}"
        
        payload = {
            "merchantId": self.client_id,
            "merchantTransactionId": merchant_transaction_id,
            "merchantUserId": merchant_user_id,
            "amount": int(amount * 100),
            "redirectUrl": redirect_url,
            "redirectMode": "POST",
            "callbackUrl": callback_url,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }
        
        payload_json = json.dumps(payload)
        payload_b64 = base64.b64encode(payload_json.encode()).decode()
        
        endpoint = "/pg/v1/pay"
        x_verify = self.generate_checksum(payload_b64, endpoint)
        
        headers = {
            'Content-Type': 'application/json',
            'X-VERIFY': x_verify,
            'X-MERCHANT-ID': self.client_id,
            'accept': 'application/json'
        }
        
        request_data = {"request": payload_b64}
        
        try:
            response = requests.post(
                f"{self.get_base_url()}{endpoint}",
                json=request_data,
                headers=headers,
                timeout=30
            )
            response_data = response.json()
            
            if response_data.get('success'):
                payment_url = response_data['data']['instrumentResponse']['redirectInfo']['url']
                return {
                    'success': True,
                    'payment_url': payment_url,
                    'merchant_transaction_id': merchant_transaction_id,
                    'response': response_data
                }
            else:
                return {
                    'success': False,
                    'error': response_data.get('message', 'Payment initiation failed'),
                    'response': response_data
                }
        except requests.exceptions.Timeout:
            return {
                'success': False,
                'error': 'Payment gateway timeout. Please try again.'
            }
        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': f'Connection error: {str(e)}'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def check_status(self, merchant_transaction_id):
        """Check payment status"""
        endpoint = f"/pg/v1/status/{self.client_id}/{merchant_transaction_id}"
        
        checksum_string = f"{endpoint}{self.client_secret}"
        checksum = hashlib.sha256(checksum_string.encode()).hexdigest()
        x_verify = f"{checksum}###1"
        
        headers = {
            'Content-Type': 'application/json',
            'X-VERIFY': x_verify,
            'X-MERCHANT-ID': self.client_id,
            'accept': 'application/json'
        }
        
        try:
            response = requests.get(
                f"{self.get_base_url()}{endpoint}",
                headers=headers,
                timeout=30
            )
            return response.json()
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'Status check timeout'}
        except requests.exceptions.RequestException as e:
            return {'success': False, 'error': f'Connection error: {str(e)}'}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def verify_webhook(self, response_b64, x_verify_header):
        """Verify webhook signature - MUST be called for all webhooks"""
        if not response_b64 or not x_verify_header:
            return False
            
        checksum_string = f"{response_b64}{self.client_secret}"
        calculated_checksum = hashlib.sha256(checksum_string.encode()).hexdigest()
        
        header_checksum = x_verify_header.split('###')[0] if '###' in x_verify_header else x_verify_header
        
        return calculated_checksum == header_checksum


class RazorpayPaymentService:
    """Razorpay Payment Gateway Service - placeholder for future implementation"""
    
    def __init__(self):
        self.key_id = os.environ.get('RAZORPAY_KEY_ID')
        self.key_secret = os.environ.get('RAZORPAY_KEY_SECRET')
    
    def initiate_payment(self, amount, user_id, batch_id, redirect_url, callback_url):
        """Placeholder for Razorpay payment initiation"""
        return {
            'success': False,
            'error': 'Razorpay integration coming soon',
            'coming_soon': True
        }
    
    def check_status(self, order_id):
        """Placeholder for Razorpay status check"""
        return {'success': False, 'error': 'Razorpay integration coming soon'}
    
    def verify_webhook(self, payload, signature):
        """Placeholder for Razorpay webhook verification"""
        return False


class PaymentGatewayFactory:
    """Factory to get the appropriate payment gateway service"""
    
    @staticmethod
    def get_service(gateway_name):
        services = {
            'phonepe': PhonePePaymentService,
            'razorpay': RazorpayPaymentService,
        }
        
        service_class = services.get(gateway_name.lower())
        if service_class:
            return service_class()
        
        raise ValueError(f"Unknown payment gateway: {gateway_name}")
