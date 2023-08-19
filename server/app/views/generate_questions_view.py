from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import os


class GenerateQuestionsView(APIView):
    def post(self, request):
        print('Generate question list...')
        questions = self.generate_questions(request.data)
        return Response(questions)  
    
    def generate_questions(self, data):
        profile = ""
        industry = ""
        goal = ""
        if data.get('invitee_about'):
            profile += "about:\n" + data['invitee_about'] + "\n\n"
        if data.get('invitee_experience'):
            profile += "experience:\n" + data['invitee_experience'] + "\n\n"
        if data.get('invitee_education'):
            profile += "education:\n" + data['invitee_education'] + "\n\n"
        if data.get('invitee_industry'):
            industry = data['invitee_industry'] + "industry "
        if data.get('goal'):
            goal = " The overall goal of the conversation is to " + data['goal'] + "."
        headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY")
        }
        content = "In an HTML format list with no title or head, create interesting conversation questions to bring up during a coffee chat with a " + industry + "professional that has the background specified below." + goal + "\n\n" + profile
        print(content)
        json = self.get_json(content)
        print('sending request...')
        try:
            res = requests.post(url="https://api.openai.com/v1/chat/completions", headers=headers, json=json).json()["choices"][0]['message']['content']
        except KeyError:
            return {"error": "Sorry, I couldn't generate any questions for this profile. Try to limit the amount of information you provide and avoid using images."}
        return res
    
    def get_json(self, content):
        return {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": content}],
            "temperature": 1.2
        }