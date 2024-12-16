import random
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializer import UserSerializer, UpdatePasswordSerializer, UserDetailSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def generate_confirmation_code():
    return str(random.randint(100000, 999999))

def send_confirmation_email(user_email, confirmation_code):
    subject = "Your Email Confirmation Code"
    message = f"Your Email confirmation code is: {confirmation_code}"
    from_email = settings.DEFAULT_FROM_EMAIL
    send_mail(subject, message, from_email, [user_email])


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        confirmation_code = generate_confirmation_code()
        user.confirmation_code = confirmation_code
        user.save()
        send_confirmation_email(user.email, confirmation_code)
        return Response({"message": "User registered successfully! Please check your email for the confirmation code."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_email(request):
    email = request.data.get('email')
    confirmation_code = request.data.get('confirmation_code')

    if not email or not confirmation_code:
        return Response({"error": "Email and confirmation code are required!"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
        if user.confirmation_code == confirmation_code:
            user.is_email_verified = True
            user.save()
            return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid confirmation code!"}, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found!"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    identifier = request.data.get('identifier')
    password = request.data.get('password')
    print(f"Login identifier: {identifier}")
    user = CustomUser.objects.filter(Q(username=identifier) | Q(email=identifier)).first()

    if not user:
        return Response({"error": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)

    if user.check_password(password):
        if not user.is_email_verified:
            return Response({"error": "Your email is not verified."}, status=status.HTTP_403_FORBIDDEN)
        tokens = get_tokens_for_user(user)
        return Response({
            "message": "Login successful!",
            "tokens": tokens,
            "user": UserDetailSerializer(user).data
        }, status=status.HTTP_200_OK)

    return Response({"error": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully!"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception:
        return Response({"error": "Failed to log out!"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    serializer = UserDetailSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User details updated successfully!"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    request.user.delete()
    return Response({"message": "Account deleted successfully!"}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def reset_password(request):
    serializer = UpdatePasswordSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        if user.check_password(serializer.validated_data['old_password']):
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"message": "Password updated successfully!"}, status=status.HTTP_200_OK)
        return Response({"error": "Old password is incorrect!"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_user_details(request):
    """
    View to get the authenticated user's details.
    """
    user = request.user  # Get the logged-in user
    serializer = UserDetailSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
