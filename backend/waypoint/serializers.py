from rest_framework import serializers
from .models import City, Category, TouristPoint

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TouristPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = TouristPoint
        fields = '__all__'

