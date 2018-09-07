from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions

from chat import models as chat_models
from api import serializers


class UsersListView(generics.ListAPIView):
    queryset = User.objects
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChannelsListCreateView(generics.ListCreateAPIView):
    queryset = chat_models.Channel.objects
    serializer_class = serializers.ChannelSerializer
    permission_classes = (permissions.IsAuthenticated, )


class MessagesListView(generics.ListAPIView):
    queryset = chat_models.Message.objects
    serializer_class = serializers.MessageSerializer
    permission_classes = (permissions.IsAuthenticated, )

