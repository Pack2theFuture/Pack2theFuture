from django.urls import path, include
from . import views

urlpatterns = [
    path("location/", views.user_location),
    path("collections/<int:centerId>/", views.select_location),
]
