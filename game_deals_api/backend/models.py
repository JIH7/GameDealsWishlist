from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
    
class User(AbstractBaseUser):
    email = models.EmailField(max_length=80)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username
    
class Game(models.Model):
    title = models.CharField(max_length=50)
    desired_price = models.DecimalField(decimal_places=2, max_digits=5)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, to_field="id")

    def __str__(self):
        return self.title