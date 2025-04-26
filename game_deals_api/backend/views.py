from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import GameSerializer
from .serializers import UserSerializer
from .models import Game
from .models import User

# Create your views here.

class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()

    def list(self, request, *args, **kwargs):
        userid = request.GET.get("userid", "")

        if (userid):
            self.queryset = self.queryset.filter(userid__id=userid)

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username) # Debug
        print(password) # Debug
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

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
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        # Validate and save the data
        if serializer.is_valid():
            # Save the user and return a success response with status 201
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            print(errors)
            # If the data is invalid, return a bad request response
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
