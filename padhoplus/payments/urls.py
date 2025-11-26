from django.urls import path
from . import views

app_name = 'payments'

urlpatterns = [
    path('gateways/', views.get_available_gateways, name='available_gateways'),
    path('initiate/', views.initiate_payment, name='initiate_payment'),
    path('callback/', views.payment_callback, name='payment_callback'),
    path('webhook/', views.payment_webhook, name='payment_webhook'),
    path('status/<str:transaction_id>/', views.check_payment_status, name='check_status'),
    path('history/', views.get_user_payments, name='payment_history'),
]
