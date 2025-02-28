from django.db import models

# Create your models here.

class Game(models.Model):
    title = models.CharField(max_length=50)
    desired_price = models.DecimalField(decimal_places=2, max_digits=5)

    def __str__(self):
        return self.title
    
class User(models.Model):
    email = models.EmailField(max_length=80)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username