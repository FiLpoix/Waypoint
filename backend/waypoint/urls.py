from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CityViewSet, CategoryViewSet, TouristPointViewSet, FavoriteViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .auth_views import register_user, login_user

router = DefaultRouter()
router.register(r'citys', CityViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tourist_points', TouristPointViewSet)
router.register(r'favorites', FavoriteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register_user, name='register'),
    path('api/login/', login_user, name='login'),
]
