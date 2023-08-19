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
from app.views import GenerateQuestionsView, UserDetailView, UserListView, UserMeetingsView, MeetingDetailView, MeetingsView

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('generate/', GenerateQuestionsView.as_view(), name="generate"),
    path('api/', include(router.urls)),
    path('api/users/<str:email>/', UserDetailView.as_view(), name="user"),
    path('api/users/', UserListView.as_view(), name="users"),
    path('api/users/<int:id>/meetings/', UserMeetingsView.as_view(), name="meetings"),
    path('api/meetings/<int:id>/', MeetingDetailView.as_view(), name="meeting"),
    path('api/meetings/', MeetingsView.as_view(), name="all_meetings"),
]
