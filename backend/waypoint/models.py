from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.

class City(models.Model):
    name = models.CharField(max_length=100)
    uf = models.CharField(max_length=2, default='PI')
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    tipo_choices = [
        ('festival', 'Festival'),
        ('natureza', 'Natureza'),
        ('arquitetonico', 'Arquitetonico'),
    ]
    tipo = models.CharField(max_length=50, choices=tipo_choices, unique=True, blank=True, null=True)
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='category_icons/', blank=True, null=True)

    def __str__(self):
        return self.tipo

class TouristPoint(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='tourist_points/', blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='tourist_points')
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tourist_points')
    location_lat = models.CharField(max_length=50, null=True, blank=True)
    location_long = models.CharField(max_length=50, null=True, blank=True)
    view_count = models.IntegerField(default=0)

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    tourist_point = models.ForeignKey(TouristPoint, on_delete=models.CASCADE, related_name='favorites')
    created_at = models.DateTimeField(auto_now_add=True)

class Rating(models.Model):
    ContentType = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('ContentType', 'object_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    score = models.IntegerField()
    commment = models.TextField(blank=True, null=True)