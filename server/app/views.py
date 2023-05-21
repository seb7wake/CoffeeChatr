from rest_framework import viewsets
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
import os
import pdb
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import requests
from selenium.common.exceptions import WebDriverException, NoSuchElementException


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        print(users)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print('post request:', request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    def get(self, request, email, format=None):
        try:
            user = User.objects.get(email=email)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
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

class MeetingList(APIView):
    def get(self, request, id):
        meetings = Meeting.objects.all().filter(user__pk=id)
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)
    
    def post(self, request, id):
        print('hereeeeeeee')
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        meeting = Meeting.objects.get(pk=id)
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class GenerateQuestionList(APIView):
    def get(self, request, profile_url):
        print('Gnerate question list...')
        linkedin = linkedin_scrape(profile_url)
        questions = generate_questions(linkedin["education"], linkedin["about"], linkedin["experience"])
        return Response(questions)  

def linkedin_scrape(profile_url):
    # Creating a webdriver instance
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome("../chromedriver", options=options)
    login(driver)    
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

def generate_questions(education, about, experience):
    headers = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY")
    }
    about = "\n\nAbout: " + about if about else ""
    content = "Create coffee chat conversation topics with a professional with the following linkedin profile: \n\nExperience:\n" + experience + "\n\n Education:\n" + education + about
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

def login(driver):
    print("Logging in...")
    driver.get("https://linkedin.com/uas/login")
    time.sleep(2)
    username = driver.find_element(By.ID, "username")
    username.send_keys("seb7wake@gmail.com") 
    pword = driver.find_element(By.ID, "password")
    pword.send_keys("$EBastian7788") 
    driver.find_element(By.XPATH, "//button[@type='submit']").click()  
    