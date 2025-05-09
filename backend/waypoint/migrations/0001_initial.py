# Generated by Django 5.2 on 2025-04-09 19:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('region', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TouristPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('location', models.CharField(max_length=100)),
                ('view_count', models.IntegerField(default=0)),
                ('Category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tourist_points', to='waypoint.category')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tourist_points', to='waypoint.city')),
            ],
        ),
    ]
