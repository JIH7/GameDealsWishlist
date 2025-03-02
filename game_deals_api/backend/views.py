from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
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

    def list(self, request, *args, **kwargs):
        email = request.GET.get("email", "")
        username = request.GET.get("username", "")

        if (email):
            self.queryset = self.queryset.filter(email__icontains=email)

        if (username):
            self.queryset = self.queryset.filter(username__icontains=username)

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)