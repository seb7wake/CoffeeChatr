# Generated by Django 4.1.6 on 2023-09-08 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_alter_education_options_alter_experience_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='meeting_start_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
