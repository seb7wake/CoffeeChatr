from rest_framework import serializers
from .models import User
from .models import Meeting

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'title', 'invitee_linkedin_url', "meeting_link", "meeting_notes", "questions", "meeting_start_time", "user")