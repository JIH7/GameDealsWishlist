from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GameSerializer
from .serializers import UserSerializer
from .models import Game
from .models import User

# Create your views here.

class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()