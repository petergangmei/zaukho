from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    """Category model for organizing movies and TV shows"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Movie(models.Model):
    """Movie model for storing movie information"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_date = models.DateField()
    duration = models.IntegerField(help_text="Duration in minutes")
    poster = models.ImageField(upload_to="movies/posters/", blank=True, null=True)
    trailer_url = models.URLField(blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name="movies")
    price_buy = models.DecimalField(max_digits=6, decimal_places=2, help_text="Purchase price")
    price_rent = models.DecimalField(max_digits=6, decimal_places=2, help_text="Rental price")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class TVSeries(models.Model):
    """TV Series model for storing TV show information"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_date = models.DateField()
    poster = models.ImageField(upload_to="tv/posters/", blank=True, null=True)
    trailer_url = models.URLField(blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name="tv_series")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "TV Series"

class Season(models.Model):
    """Season model for TV series"""
    tv_series = models.ForeignKey(TVSeries, related_name="seasons", on_delete=models.CASCADE)
    season_number = models.IntegerField()
    title = models.CharField(max_length=200, blank=True, null=True)
    release_date = models.DateField()
    price_buy = models.DecimalField(max_digits=6, decimal_places=2, help_text="Purchase price for whole season")
    
    def __str__(self):
        return f"{self.tv_series.title} - Season {self.season_number}"
    
    class Meta:
        unique_together = ('tv_series', 'season_number')

class Episode(models.Model):
    """Episode model for TV series seasons"""
    season = models.ForeignKey(Season, related_name="episodes", on_delete=models.CASCADE)
    episode_number = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in minutes")
    video_file = models.FileField(upload_to="tv/episodes/", blank=True, null=True)
    price_rent = models.DecimalField(max_digits=6, decimal_places=2, help_text="Rental price for individual episode")
    
    def __str__(self):
        return f"{self.season.tv_series.title} - S{self.season.season_number}E{self.episode_number} - {self.title}"
    
    class Meta:
        unique_together = ('season', 'episode_number')

class Purchase(models.Model):
    """Model to track user purchases"""
    CONTENT_TYPES = (
        ('movie', 'Movie'),
        ('season', 'TV Season'),
    )
    
    user = models.ForeignKey(User, related_name="purchases", on_delete=models.CASCADE)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPES)
    movie = models.ForeignKey(Movie, null=True, blank=True, on_delete=models.SET_NULL)
    season = models.ForeignKey(Season, null=True, blank=True, on_delete=models.SET_NULL)
    purchase_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    transaction_id = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        content = self.movie.title if self.movie else self.season.__str__()
        return f"{self.user.username} purchased {content} on {self.purchase_date.strftime('%Y-%m-%d')}"

class Rental(models.Model):
    """Model to track user rentals"""
    CONTENT_TYPES = (
        ('movie', 'Movie'),
        ('episode', 'TV Episode'),
    )
    
    user = models.ForeignKey(User, related_name="rentals", on_delete=models.CASCADE)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPES)
    movie = models.ForeignKey(Movie, null=True, blank=True, on_delete=models.SET_NULL)
    episode = models.ForeignKey(Episode, null=True, blank=True, on_delete=models.SET_NULL)
    rental_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField()  # When the rental expires (typically 48 hours)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    transaction_id = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        content = self.movie.title if self.movie else self.episode.__str__()
        return f"{self.user.username} rented {content} until {self.expiry_date.strftime('%Y-%m-%d %H:%M')}"
