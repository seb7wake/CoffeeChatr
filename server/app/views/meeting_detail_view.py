from rest_framework.views import APIView
from rest_framework.response import Response
from app.serializers import *
from app.models import *
from rest_framework import status
from django.db import transaction

class MeetingDetailView(APIView):
    def get(self, request, id, format=None):
        meeting = Meeting.objects.get(pk=id)
        serializer = MeetingSerializer(meeting, many=False)
        return Response(serializer.data)
    
    def put(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        serializer = MeetingSerializer(meeting, data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                experience = request.data['experience']
                education = request.data['education']
                self.delete_experience(experience, meeting)
                self.delete_education(education, meeting)

                for exp in experience:
                    if type(exp["id"]) == str:
                        exp['meeting'] = meeting.id
                        exp_serializer = ExperienceSerializer(data=exp)
                        if exp_serializer.is_valid():
                            exp_serializer.save(meeting=meeting)
                        else:
                            return Response({'errors': exp_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        exp_obj = Experience.objects.get(pk=exp['id'])
                        exp_serializer = ExperienceSerializer(exp_obj, data=exp)
                        if exp_serializer.is_valid():
                            exp_serializer.save()
                        else:
                            return Response({'errors': exp_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                        
                for edu in education:
                    if type(edu["id"]) == str:
                        edu['meeting'] = meeting.id
                        edu_serializer = EducationSerializer(data=edu)
                        if edu_serializer.is_valid():
                            edu_serializer.save(meeting=meeting)
                        else:
                            return Response({'errors': edu_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        edu_obj = Education.objects.get(pk=edu['id'])
                        edu_serializer = EducationSerializer(edu_obj, data=edu)
                        if edu_serializer.is_valid():
                            edu_serializer.save()
                        else:
                            return Response({'errors': edu_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                        
            return Response(serializer.data, status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete_experience(self, experience, meeting):
        curr_experience = meeting.experience.all().values_list('id', flat=True)
        new_experience = [exp['id'] for exp in experience]
        delete_ids = set(curr_experience) - set(new_experience)
        for id in delete_ids:
            Experience.objects.get(pk=id).delete()
       
    
    def delete_education(self, education, meeting):
        curr_education = meeting.education.all().values_list('id', flat=True)
        new_education = [edu['id'] for edu in education]
        delete_ids = set(curr_education) - set(new_education)
        for id in delete_ids:
            Education.objects.get(pk=id).delete()
                    
    def delete(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)