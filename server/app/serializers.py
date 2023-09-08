from rest_framework import serializers
from .models import User, Meeting, Experience, Education

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'title', 'invitee_name', 'meeting_link', 'goal', "education", "experience", 'invitee_linkedin_url', "meeting_link", "invitee_industry", "invitee_about", "meeting_notes", "questions", "meeting_start_time")
    
    meeting_start_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", allow_null=True, required=False)
    experience = serializers.SerializerMethodField()
    education = serializers.SerializerMethodField()

    def get_experience(self, obj):
        return ExperienceSerializer(obj.experience.all(), many=True).data
    
    def get_education(self, obj):
        return EducationSerializer(obj.education.all(), many=True).data

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ('id', 'title', 'company', 'description', 'meeting')

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('id', 'school', 'degree', 'field_of_study', 'description', 'meeting')
    