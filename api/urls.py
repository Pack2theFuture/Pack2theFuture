from django.urls import path, include
from . import views

urlpatterns = [
    path("location/", views.user_location),
    path("collections/<int:centerId>/", views.select_location),
    path("depart/", views.user_depart),
    path("arrive/", views.user_arrive),
    
    path("signup/", views.signup),
    path("login/", views.login_view),
    path("logout/", views.logout_view),

    path("mypage/", views.user_info),
    path("user-info/", views.user_info),
    path("session-check/", views.session_check_view),
    path("collection-history/", views.collection_history),
]
