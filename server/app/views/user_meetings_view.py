from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.serializers import *
from app.models import *
from rest_framework import status

class UserMeetingsView(APIView):
    def get(self, request, id):
        meetings = Meeting.objects.filter(user__pk=id)
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)
    
    def post(self, request, id):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=User.objects.get(pk=id))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)