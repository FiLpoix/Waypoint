from django.urls import path, include # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore
from .views import CityViewSet, CategoryViewSet, TouristPointViewSet, FavoriteViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # type: ignore
from .auth_views import register_user, login_user

router = DefaultRouter()
router.register(r'cities', CityViewSet)
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