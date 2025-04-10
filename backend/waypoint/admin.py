from django.contrib import admin
from .models import City, Category, TouristPoint, Favorite

# Register your models here.
admin.site.register(City)
admin.site.register(Category)
admin.site.register(TouristPoint)
admin.site.register(Favorite)
