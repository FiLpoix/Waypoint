from django.db import models

# Create your models here.

class City(models.Model):
    name = models.CharField(max_length=100)
    region = models.CharField(max_length=100)

class Category(models.Model):
    name = models.CharField(max_length=100)

class TouristPoint(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='tourist_points')
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tourist_points')
    location = models.CharField(max_length=100)
    view_count = models.IntegerField(default=0)
