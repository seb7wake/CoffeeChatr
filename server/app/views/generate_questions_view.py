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
        content = ""
        if data.get('invitee_industry'):
            content += "Industry: " + data['invitee_industry'] + "\n"
        if data.get('goal'):
            content += "Meeting Goal: " + data['goal'] + "\n"
        if data.get('invitee_about'):
            content += "About guest: " + data['invitee_about'] + "\n"
        if data.get('experience'):
            content += "Guests' Previous Work experience: "
            for exp in data['experience']:
                content += "position: " + exp['title'] + "\n" + "company: " + exp['company']
                if exp['description']:
                    content += "\ndescription:\n" + exp['description']
                content += "\n"
        content += "\n"

        headers = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY")
        }
        prompt = self.get_prompt_3(content)
        print(prompt)
        json = self.get_json(prompt)
        print('sending request...')
        try:
            res = requests.post(url="https://api.openai.com/v1/chat/completions", headers=headers, json=json).json()["choices"][0]['message']['content']
        except KeyError:
            return {"error": "Sorry, I couldn't generate any questions for this profile. Try to limit the amount of information you provide and avoid using images."}
        return res
    
    def get_json(self, prompt):
        return {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 1.2
        }
    
    def get_prompt_1(self, content):
        return "Design a set of engaging conversation topics and questions in HTML format that cater to the following scenario:\n\n" + content + "Ensure that the topics and questions are tailored to foster meaningful discussions over coffee. Present the generated content as a list within <li> tags for easy integration into our CoffeeChatr platform. Your creativity and strategic thinking in generating relevant conversation points are highly appreciated!"
    
    def get_prompt_2(self, content):
        return "Generate a list of thought-provoking questions and discussion topics for a networking event. You have access to the following information about the guest:\n\n" + content +  "Your mission is to create a diverse and engaging set of questions and topics that will facilitate meaningful conversations and networking opportunities. These questions should highlight the guest's expertise, background, and industry, while also encouraging insightful discussions among attendees. Format the final list as an HTML unordered list (<ul>) for easy integration into an app"
    
    def get_prompt_3(self, content):
        return "Generate a list of stimulating conversation topics and questions for a networking event's discussion guide and put the results in html format. The event will host a diverse group of professionals. Utilize the following inputs to craft engaging headers in <h2> and insightful subpoints in <ul> for each topic:\n\n" + content + "For each topic, craft a list of subpoints in HTML format that form meaningful questions encouraging thoughtful conversation and a deeper connection among participants. Ensure the questions spark insightful discussions and allow for natural flow during the networking event. Aim to create an atmosphere that fosters valuable interactions and mutual learning among the attendees."