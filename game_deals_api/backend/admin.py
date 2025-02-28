from django.contrib import admin

# Register your models here.
from .models import Game
from .models import User

class GamesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'desired_price')

admin.site.register(Game, GamesAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'password')

admin.site.register(User, UserAdmin)