# Generated by Django 5.1.5 on 2025-03-03 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_game_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
    ]
