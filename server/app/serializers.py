from rest_framework import serializers
from .models import User
from .models import Meeting

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'title', 'invitee_name', 'meeting_link', 'invitee_linkedin_url', "meeting_link", "invitee_industry", "invitee_about", "invitee_experience", "invitee_education", "meeting_notes", "questions", "meeting_start_time")
    
    meeting_start_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=True)