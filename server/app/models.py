from django.db import models
from django.contrib.auth.models import User

class Meeting(models.Model):
    id = models.AutoField(primary_key=True)
    invitee_name = models.CharField(max_length=50, default="", blank=True)
    title = models.CharField(max_length=50)
    invitee_industry = models.CharField(max_length=50, default="", blank=True)
    invitee_linkedin_url = models.CharField(max_length=50, default="", blank=True)
    meeting_link = models.CharField(max_length=100, default="", blank=True)
    meeting_notes = models.TextField(default="", blank=True)
    invitee_background = models.TextField(default="", blank=True)
    questions = models.TextField(default="", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    meeting_start_time = models.DateTimeField(default=None, blank=True, null=True)
    user = models.ForeignKey(User, related_name='meetings', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
