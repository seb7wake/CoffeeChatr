from rest_framework.views import APIView
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from rest_framework import status

class MeetingDetailView(APIView):
    def get(self, request, id, format=None):
        meeting = Meeting.objects.get(pk=id)
        serializer = MeetingSerializer(meeting, many=False)
        return Response(serializer.data)
    
    def put(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        serializer = MeetingSerializer(meeting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)