from django.contrib import admin
from .models import Category, Movie, TVSeries, Season, Episode, Purchase, Rental

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'duration', 'price_buy', 'price_rent', 'is_featured')
    list_filter = ('is_featured', 'categories')
    search_fields = ('title', 'description')
    date_hierarchy = 'release_date'

@admin.register(TVSeries)
class TVSeriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'is_featured')
    list_filter = ('is_featured', 'categories')
    search_fields = ('title', 'description')
    date_hierarchy = 'release_date'

class EpisodeInline(admin.TabularInline):
    model = Episode
    extra = 1

@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    list_display = ('tv_series', 'season_number', 'title', 'release_date', 'price_buy')
    list_filter = ('tv_series',)
    search_fields = ('title',)
    inlines = [EpisodeInline]

@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('title', 'season', 'episode_number', 'duration', 'price_rent')
    list_filter = ('season__tv_series', 'season')
    search_fields = ('title', 'description')

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_type', 'purchase_date', 'amount', 'transaction_id')
    list_filter = ('content_type', 'purchase_date')
    search_fields = ('user__username', 'transaction_id')
    date_hierarchy = 'purchase_date'

@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_type', 'rental_date', 'expiry_date', 'amount', 'transaction_id')
    list_filter = ('content_type', 'rental_date')
    search_fields = ('user__username', 'transaction_id')
    date_hierarchy = 'rental_date'
