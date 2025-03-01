from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'movies', views.MovieViewSet)
router.register(r'tv-series', views.TVSeriesViewSet)
router.register(r'seasons', views.SeasonViewSet)
router.register(r'episodes', views.EpisodeViewSet)
router.register(r'purchases', views.PurchaseViewSet, basename='purchase')
router.register(r'rentals', views.RentalViewSet, basename='rental')

# Additional URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),  # DRF's login/logout views
    path('library/', views.my_library, name='my-library'),
] 