from django.test import TestCase
from rest_framework.test import APIClient
from urllib.parse import urlencode
from .models import User, Meeting

mock_user = {
    'email': 'test@test.com', 
}

mock_meeting = {
    'title': 'test',
    'invitee_linkedin_url': 'test',
    'meeting_link': 'test',
    'meeting_notes': 'test',
    'questions': 'test',
    'meeting_start_time': '2020-01-01T00:00:00Z'
}

class UserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # self.user = User.objects.create(**mock_user)
        # self.user.save()
        # mock_meeting['user'] = self.user
        # self.meeting = Meeting.objects.create(**mock_meeting)
        # self.meeting.save()
        # print('here')

    # def test_get_user(self):
    #     response = self.client.get('/api/users/' + self.user.id + '/')
    #     import pdb; pdb.set_trace()
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.data['email'], mock_user['email'])

    # def test_get_users(self):
    #     response = self.client.get('/api/users/')
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.data[0]['email'], mock_user['email'])

    def test_create_user(self):
        response = self.client.post('/api/users/', mock_user)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['email'], mock_user['email'])

    # def test_update_user(self):
    #     response = self.client.put('/api/users/' + self.user.id + '/', mock_user)
    #     self.assertEqual(response.status_code, 201)
    #     self.assertEqual(response.data['email'], mock_user['email'])

    # def test_delete_user(self):
    #     response = self.client.delete('/api/users/' + self.user.id + '/')
    #     self.assertEqual(response.status_code, 204)
    
    # def test_get_user_meetings(self):
    #     response = self.client.get('/api/users/' + self.user.id + '/' + 'meetings/')
    #     self.assertEqual(response.status_code, 200)


class MeetingTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(**mock_user)
        self.user.save()
        mock_meeting['user'] = self.user
        self.meeting = Meeting.objects.create(**mock_meeting)
        self.meeting.save()

    # def test_get_meetings(self):
    #     response = self.client.get('/api/meetings/1/')
    #     self.assertEqual(response.status_code, 200)

    # def test_create_meeting(self):
    #     response = self.client.post('/api/meetings/', mock_meeting)
    #     self.assertEqual(response.status_code, 201)

    # def test_update_meeting(self):
    #     response = self.client.put('/api/meetings/1/', mock_meeting)
    #     self.assertEqual(response.status_code, 201)

    # def test_delete_meeting(self):
    #     response = self.client.delete('/api/meetings/1/')
    #     self.assertEqual(response.status_code, 204)
                                            

