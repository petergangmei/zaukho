from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

class EmailOrUsernameModelBackend(ModelBackend):
    """
    Custom authentication backend that supports login with either username or email
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        
        try:
            # Try to fetch the user by username or email
            user = UserModel.objects.filter(
                Q(username__iexact=username) | Q(email__iexact=username)
            ).first()
            
            # If user exists and password is correct, return user
            if user and user.check_password(password):
                return user
                
        except UserModel.DoesNotExist:
            # No user found, return None
            return None
            
        # Authentication failed
        return None 