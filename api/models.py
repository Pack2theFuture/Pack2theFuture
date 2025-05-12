from ctypes import addressof
from django.db import models

class CollectionCenter (models.Model):
    centerId = models.IntegerField()
    name = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address =models.CharField(max_length=100)
    opening_hour = models.CharField(max_length=10)
    closing_hour = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)