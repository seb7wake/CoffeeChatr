from django.contrib import admin
from django.contrib.auth.models import User
from .models import Meeting


class MeetingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user')

admin.site.register(Meeting, MeetingAdmin)
