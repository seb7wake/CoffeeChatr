from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.serializers import *
from app.models import *
from rest_framework import status
from django.db import transaction

class UserMeetingsView(APIView):
    def get(self, request, id):
        meetings = Meeting.objects.filter(user__pk=id)
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)
    
    def post(self, request, id):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                meeting = serializer.save(user=User.objects.get(pk=id))
                experience = request.data['experience']
                education = request.data['education']

                for exp in experience:
                    exp['meeting'] = meeting.id
                    exp_serializer = ExperienceSerializer(data=exp)
                    if exp_serializer.is_valid():
                        exp_serializer.save(meeting=meeting)
                    else:
                        return Response({'errors': exp_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

                for edu in education:
                    edu['meeting'] = meeting.id
                    edu_serializer = EducationSerializer(data=edu)
                    if edu_serializer.is_valid():
                        edu_serializer.save(meeting=meeting)
                    else:
                        return Response({'errors': edu_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)