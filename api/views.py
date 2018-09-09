from django.contrib.auth.models import User
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend

from chat import models as chat_models
from api import serializers, pagination


class UsersListView(generics.ListAPIView):
    queryset = User.objects
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChannelsListCreateView(generics.ListCreateAPIView):
    queryset = chat_models.Channel.objects.filter(is_private=False)
    serializer_class = serializers.ChannelSerializer
    permission_classes = (permissions.IsAuthenticated, )


class MessagesListView(generics.ListAPIView):
    queryset = chat_models.Message.objects
    pagination_class = pagination.PageNumPagination
    serializer_class = serializers.MessageSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    ordering = ('-sent_at',)
    filter_fields = ('channel__name', )

