from django.urls import reverse
from rest_framework import serializers
from .models import City, Category, TouristPoint, Favorite

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    icon_url = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = '__all__'
    
    def get_icon_url(self, obj):
        if obj.icon:
            return self.context['request'].build_absolute_uri(obj.icon.url)
        return None

class TouristPointSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = TouristPoint
        fields = '__all__'
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'