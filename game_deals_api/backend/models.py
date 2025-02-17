from django.db import models

# Create your models here.

class Game(models.Model):
    title = models.CharField(max_length=50)
    desired_price = models.DecimalField(decimal_places=2, max_digits=5)

    def __str__(self):
        return self.title