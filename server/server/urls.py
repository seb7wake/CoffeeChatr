"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from app import views

router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet, 'users')
# router.register(r'meetings', views.MeetingViewSet, 'meetings')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('generate/<str:profile_url>/', views.GenerateQuestionList.as_view(), name="generate"),
    path('api/', include(router.urls)),
    path('api/users/<str:email>/', views.UserDetail.as_view(), name="user"),
    path('api/users/', views.UserList.as_view(), name="users"),
    path('api/users/<int:id>/meetings/', views.MeetingList.as_view(), name="meetings"),
    path('api/meetings/<int:id>/', views.MeetingDetail.as_view(), name="meeting"),
]
