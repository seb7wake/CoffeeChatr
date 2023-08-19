from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .serializers import *
from .models import *

import os
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.common.exceptions import NoSuchElementException



def linkedin_scrape(profile_url):
    # Creating a webdriver instance
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome("../chromedriver", options=options)
    linkedin_login(driver)    
    driver.get("https://www.linkedin.com/in/" + profile_url + "/")
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
    return "education:\n" + education + "\n\nabout:\n" + about + "\n\nexperience:\n" + experience

def linkedin_login(driver):
    print("Logging in...")
    driver.get("https://linkedin.com/uas/login")
    time.sleep(2)
    username = driver.find_element(By.ID, "username")
    username.send_keys("seb7wake@gmail.com") 
    pword = driver.find_element(By.ID, "password")
    pword.send_keys("$EBastian7788") 
    driver.find_element(By.XPATH, "//button[@type='submit']").click()  
    