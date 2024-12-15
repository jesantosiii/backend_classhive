from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('confirm-email/', views.confirm_email, name='confirm_email'),
    path('update-user/', views.update_user, name='update_user'),
    path('delete-account/', views.delete_account, name='delete_account'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('get-user-details/', views.get_user_details, name='get_user_details'),

]
