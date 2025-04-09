from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CityViewSet, CategoryViewSet, TouristPointViewSet

router = DefaultRouter()
router.register(r'citys', CityViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tourist_points', TouristPointViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
