from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .auth_serializers import UserSerializer, RegisterSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Custom login view that validates username and password,
    and returns JWT tokens with user details
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not password:
        return Response(
            {'detail': 'Password is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Allow login with either username or email
    if not username and not email:
        return Response(
            {'detail': 'Username or email is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # If email is provided but not username, try to get the user by email
    if email and not username:
        try:
            user = User.objects.get(email=email)
            username = user.username
        except User.DoesNotExist:
            pass
    
    # Authenticate user
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        # Serialize user data
        serializer = UserSerializer(user)
        
        return Response({
            'user': serializer.data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'detail': 'Login successful'
        })
    else:
        return Response(
            {'detail': 'Invalid credentials. Please try again.'},
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    Register a new user and return JWT tokens
    """
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        # Return user data and tokens
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'detail': 'Registration successful'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Logout view that blacklists the refresh token
    """
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({'detail': 'Logout successful'})
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    """
    View to get current authenticated user details
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def token_refresh_view(request):
    """
    View to refresh the access token using a refresh token
    """
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(
                {'detail': 'Refresh token is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        refresh = RefreshToken(refresh_token)
        
        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh)
        })
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST) 