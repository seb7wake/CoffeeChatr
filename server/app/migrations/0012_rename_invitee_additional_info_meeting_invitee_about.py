# Generated by Django 4.1.6 on 2023-07-04 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_rename_invitee_background_meeting_invitee_additional_info_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='invitee_additional_info',
            new_name='invitee_about',
        ),
    ]