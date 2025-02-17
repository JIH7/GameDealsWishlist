from django.contrib import admin

# Register your models here.
from .models import Game

class GamesAdmin(admin.ModelAdmin):
    list_display = ('title', 'desired_price')

admin.site.register(Game, GamesAdmin)