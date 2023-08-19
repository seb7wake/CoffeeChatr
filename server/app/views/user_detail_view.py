from app.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from app.models import *


class UserDetailView(APIView):
    def get(self, request, email):
        user = User.objects.get(email=email)
        print("test asudbcjhwebc", email)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, email):
        user = User.objects.get(email=email)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, email):
        user = User.objects.get(email=email)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)