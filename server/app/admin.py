from django.contrib import admin
from .models import User, Meeting

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')

class MeetingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user')

admin.site.register(User, UserAdmin)
admin.site.register(Meeting, MeetingAdmin)
