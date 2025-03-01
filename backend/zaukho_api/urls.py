from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView
from . import views
from . import auth_views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'movies', views.MovieViewSet)
router.register(r'tv-series', views.TVSeriesViewSet)
router.register(r'seasons', views.SeasonViewSet)
router.register(r'episodes', views.EpisodeViewSet)
router.register(r'purchases', views.PurchaseViewSet, basename='purchase')
router.register(r'rentals', views.RentalViewSet, basename='rental')

# Authentication URL patterns
auth_patterns = [
    path('login/', auth_views.login_view, name='login'),
    path('register/', auth_views.register_view, name='register'),
    path('logout/', auth_views.logout_view, name='logout'),
    path('user/', auth_views.user_view, name='user'),
    path('token/refresh/', auth_views.token_refresh_view, name='token-refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
]

# Additional URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include(auth_patterns)),  # Custom auth views
    path('library/', views.my_library, name='my-library'),
] 