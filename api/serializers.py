from django.contrib.auth.models import User
from rest_framework import serializers
from chat import models as chat_models


class UserSerializer(serializers.ModelSerializer):
    chat_id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'chat_id')

    def get_chat_id(self, object):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return "__".join(sorted([object.username, request.user.username]))


class ChannelSerializer(serializers.ModelSerializer):
    chat_id = serializers.SerializerMethodField()

    class Meta:
        model = chat_models.Channel
        fields = '__all__'

    def get_chat_id(self, object):
        return object.name


class MessageSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer(read_only=True)
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = chat_models.Message
        fields = '__all__'

