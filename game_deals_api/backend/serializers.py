from rest_framework import serializers
from .models import Game
from .models import User

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'title', 'desired_price', 'userid')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')

    def create(self, validated_data):
        print("Created user")
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        
        if password:
            user.set_password(password)
            user.save()
        
        return user
