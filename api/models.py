from ctypes import addressof
from django.db import models

class CollectionCenter (models.Model):
    center_id = models.IntegerField()
    name = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address =models.CharField(max_length=100)
    opening_hour = models.CharField(max_length=10)
    closing_hour = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    imageUrl = models.URLField(blank=True, null=True, default="")
    
class Users(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    total_collect_amount = models.FloatField(default=0.0)
    total_carbon_reduction = models.FloatField(default=0.0)
    points = models.FloatField(default=0.0)
    
    
class CollectionHistory(models.Model):
    history_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=20)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="진행중")  # 출발, 도착 등
    center_id = models.CharField(max_length=20)
    start_latitude = models.CharField(max_length=50, blank=True, null=True)
    start_longitude = models.CharField(max_length=50, blank=True, null=True)
    distance_walk = models.FloatField(blank=True, null=True)
    collection_amount = models.FloatField(blank=True, null=True)
    carbon_amount = models.FloatField(blank=True, null=True)
    point = models.FloatField(blank=True, null=True)
    
    
    
class OrderHistory(models.Model):
    order_id = models.CharField(max_length=100, primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    product_name = models.CharField(max_length=100)
    points_used = models.FloatField()