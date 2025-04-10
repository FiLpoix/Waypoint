from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CityViewSet, CategoryViewSet, TouristPointViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'citys', CityViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tourist_points', TouristPointViewSet)
router.register(r'favorites', FavoriteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
