# Generated by Django 4.1.6 on 2023-07-04 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_alter_meeting_user_delete_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='invitee_background',
            new_name='invitee_additional_info',
        ),
        migrations.AddField(
            model_name='meeting',
            name='invitee_education',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='meeting',
            name='invitee_experience',
            field=models.TextField(blank=True, default=''),
        ),
    ]
