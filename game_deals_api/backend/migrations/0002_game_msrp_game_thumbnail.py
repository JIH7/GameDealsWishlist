# Generated by Django 5.1.5 on 2025-04-26 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='msrp',
            field=models.DecimalField(decimal_places=2, default=80, max_digits=5),
        ),
        migrations.AddField(
            model_name='game',
            name='thumbnail',
            field=models.CharField(default='', max_length=80),
        ),
    ]
