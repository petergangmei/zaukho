from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Movie, TVSeries, Season, Episode, Purchase, Rental

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    """Serializer for Movie model"""
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = '__all__'

class EpisodeSerializer(serializers.ModelSerializer):
    """Serializer for Episode model"""
    class Meta:
        model = Episode
        fields = '__all__'

class SeasonSerializer(serializers.ModelSerializer):
    """Serializer for Season model"""
    episodes = EpisodeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Season
        fields = '__all__'

class TVSeriesSerializer(serializers.ModelSerializer):
    """Serializer for TVSeries model"""
    categories = CategorySerializer(many=True, read_only=True)
    seasons = SeasonSerializer(many=True, read_only=True)
    
    class Meta:
        model = TVSeries
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    """Serializer for Purchase model"""
    movie_details = MovieSerializer(source='movie', read_only=True)
    season_details = SeasonSerializer(source='season', read_only=True)
    
    class Meta:
        model = Purchase
        fields = '__all__'
        read_only_fields = ['user', 'purchase_date', 'transaction_id']

class RentalSerializer(serializers.ModelSerializer):
    """Serializer for Rental model"""
    movie_details = MovieSerializer(source='movie', read_only=True)
    episode_details = EpisodeSerializer(source='episode', read_only=True)
    
    class Meta:
        model = Rental
        fields = '__all__'
        read_only_fields = ['user', 'rental_date', 'expiry_date', 'transaction_id'] 