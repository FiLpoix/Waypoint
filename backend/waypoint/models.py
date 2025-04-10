from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class City(models.Model):
    name = models.CharField(max_length=100)

class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='category_icons/', blank=True, null=True)

class TouristPoint(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='tourist_points/', blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='tourist_points')
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tourist_points')
    location = models.CharField(max_length=100)
    view_count = models.IntegerField(default=0)

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    tourist_point = models.ForeignKey(TouristPoint, on_delete=models.CASCADE, related_name='favorites')
    created_at = models.DateTimeField(auto_now_add=True)