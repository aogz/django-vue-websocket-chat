from django.contrib.auth.models import User
from rest_framework import serializers
from chat import models as chat_models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', )


class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = chat_models.Channel
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer(read_only=True)
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = chat_models.Message
        fields = '__all__'
