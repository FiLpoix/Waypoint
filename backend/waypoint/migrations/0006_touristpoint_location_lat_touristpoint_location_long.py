# Generated by Django 5.2 on 2025-04-14 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('waypoint', '0005_remove_touristpoint_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='touristpoint',
            name='location_lat',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='touristpoint',
            name='location_long',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
