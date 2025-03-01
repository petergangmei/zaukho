from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import uuid

from .models import (
    Category, Movie, TVSeries, Season, 
    Episode, Purchase, Rental
)
from .serializers import (
    UserSerializer, CategorySerializer, MovieSerializer, 
    TVSeriesSerializer, SeasonSerializer, EpisodeSerializer,
    PurchaseSerializer, RentalSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for Category model"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_permissions(self):
        """Allow anyone to view categories, but only admins to modify them"""
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

class MovieViewSet(viewsets.ModelViewSet):
    """ViewSet for Movie model"""
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_permissions(self):
        """Allow anyone to view movies, but only admins to modify them"""
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """Allow filtering by category and featured status"""
        queryset = Movie.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(categories__id=category)
        if featured:
            featured_bool = featured.lower() == 'true'
            queryset = queryset.filter(is_featured=featured_bool)
            
        return queryset

class TVSeriesViewSet(viewsets.ModelViewSet):
    """ViewSet for TVSeries model"""
    queryset = TVSeries.objects.all()
    serializer_class = TVSeriesSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_permissions(self):
        """Allow anyone to view TV series, but only admins to modify them"""
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """Allow filtering by category and featured status"""
        queryset = TVSeries.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(categories__id=category)
        if featured:
            featured_bool = featured.lower() == 'true'
            queryset = queryset.filter(is_featured=featured_bool)
            
        return queryset

class SeasonViewSet(viewsets.ModelViewSet):
    """ViewSet for Season model"""
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_permissions(self):
        """Allow anyone to view seasons, but only admins to modify them"""
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """Allow filtering by TV series"""
        queryset = Season.objects.all()
        tv_series = self.request.query_params.get('tv_series', None)
        
        if tv_series:
            queryset = queryset.filter(tv_series__id=tv_series)
            
        return queryset

class EpisodeViewSet(viewsets.ModelViewSet):
    """ViewSet for Episode model"""
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_permissions(self):
        """Allow anyone to view episodes, but only admins to modify them"""
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """Allow filtering by season"""
        queryset = Episode.objects.all()
        season = self.request.query_params.get('season', None)
        
        if season:
            queryset = queryset.filter(season__id=season)
            
        return queryset

class PurchaseViewSet(viewsets.ModelViewSet):
    """ViewSet for Purchase model"""
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Users can only see their own purchases"""
        return Purchase.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a purchase for the authenticated user"""
        # Generate a transaction ID
        transaction_id = str(uuid.uuid4())
        serializer.save(
            user=self.request.user,
            transaction_id=transaction_id
        )

class RentalViewSet(viewsets.ModelViewSet):
    """ViewSet for Rental model"""
    serializer_class = RentalSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Users can only see their own rentals"""
        return Rental.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a rental for the authenticated user"""
        # Set expiry date to 48 hours from now
        expiry_date = timezone.now() + timedelta(hours=48)
        # Generate a transaction ID
        transaction_id = str(uuid.uuid4())
        serializer.save(
            user=self.request.user,
            expiry_date=expiry_date,
            transaction_id=transaction_id
        )

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_library(request):
    """Endpoint to get user's purchased and rented content"""
    # Get user's purchases
    purchases = Purchase.objects.filter(user=request.user)
    purchase_serializer = PurchaseSerializer(purchases, many=True)
    
    # Get user's active rentals (not expired)
    active_rentals = Rental.objects.filter(
        user=request.user,
        expiry_date__gt=timezone.now()
    )
    rental_serializer = RentalSerializer(active_rentals, many=True)
    
    return Response({
        'purchases': purchase_serializer.data,
        'rentals': rental_serializer.data
    })
