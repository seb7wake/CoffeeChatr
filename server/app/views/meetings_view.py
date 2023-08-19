from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.serializers import *
from app.models import *


class MeetingsView(APIView):
    def get(self, request):
        meetings = Meeting.objects.all()
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)