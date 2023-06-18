from rest_framework import viewsets
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .serializers import *
from .models import *
from django.shortcuts import redirect
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

import os
import pdb
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import requests
from selenium.common.exceptions import WebDriverException, NoSuchElementException


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = authenticate(request, email=email, username=email, password=password)
        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def get(self, request):
        if request.user.is_authenticated:
            return redirect(reverse('home'))
        return Response(status=status.HTTP_200_OK)

class SignupView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        existing = User.objects.filter(email=email).first()
        if existing:
            return Response(status=status.HTTP_409_CONFLICT)
        print(email, password)
        try:
            User.objects.create_user(email=email, username=email, password=password)
            user = authenticate(request, email=email, username=email, password=password)
            login(request, user)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_201_CREATED)
    
    def get(self, request):
        if request.user.is_authenticated:
            return redirect(reverse('home'))
        return Response(status=status.HTTP_200_OK)

class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return redirect(reverse('login'))

class HomeView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return redirect(reverse('login'))
        return Response(status=status.HTTP_200_OK)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    def get(self, request, email):
        user = User.objects.get(email=email)
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
        print('delete:', email)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

class Meetings(APIView):
    def get(self, request):
        meetings = Meeting.objects.all()
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)

class MeetingList(APIView):
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

class MeetingDetail(APIView):
    def get(self, request, id, format=None):
        meeting = Meeting.objects.get(pk=id)
        serializer = MeetingSerializer(meeting, many=False)
        return Response(serializer.data)
    
    def put(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        serializer = MeetingSerializer(meeting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            import pdb; pdb.set_trace()
            return Response(serializer.data, status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class GenerateQuestionList(APIView):    
    def post(self, request):
        print('Generate question list...')
        questions = generate_questions(request.data)
        return Response(questions)  

def linkedin_scrape(profile_url):
    # Creating a webdriver instance
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome("../chromedriver", options=options)
    linkedin_login(driver)    
    driver.get("https://www.linkedin.com/in/" + profile_url + "/")
    time.sleep(2) 
    print("Scraping education...")
    education = driver.find_element(By.ID, "education").find_element(By.XPATH, "..").text
    try:
        print("Scraping about...")
        about_section = driver.find_element(By.ID, "about")
        about = about_section.find_element(By.XPATH, "..").text
    except NoSuchElementException:
        about = ""
        print("User has no About section")
    print("Scraping experience...")
    driver.get("https://www.linkedin.com/in/" + profile_url + "/details/experience/") 
    time.sleep(2)
    experience = driver.find_element(By.CLASS_NAME, "scaffold-finite-scroll__content").text
    print("Scraping complete...")
    driver.quit()
    return {"education": education, "about": about, "experience": experience}

def generate_questions(background):
    headers = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY")
    }
    content = "Create coffee chat conversation topics with a professional with the following experience background:\n\n" + background
    json = get_json(content)
    res = requests.post(url="https://api.openai.com/v1/chat/completions", headers=headers, json=json).json()["choices"][0]["message"]["content"]
    questions = format_questions(res)
    return questions

def get_json(content):
    return {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": content}],
        "temperature": 1.2
    }

def format_questions(res):
    res = res.replace("\n\n", "").split("\n")
    questions = "<ol>"
    for i in range(len(res)):
        questions += "<li>" + res[i][3:] + "</li>"
    questions += "</ol>"
    return questions

def linkedin_login(driver):
    print("Logging in...")
    driver.get("https://linkedin.com/uas/login")
    time.sleep(2)
    username = driver.find_element(By.ID, "username")
    username.send_keys("seb7wake@gmail.com") 
    pword = driver.find_element(By.ID, "password")
    pword.send_keys("$EBastian7788") 
    driver.find_element(By.XPATH, "//button[@type='submit']").click()  
    