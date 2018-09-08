from django.contrib.auth.models import User
from django.db import models


class Channel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    is_private = models.BooleanField(default=False)

    def add_message(self, text, sender, receiver=None):
        new_message = Message(text=text, sender=sender, receiver=receiver)
        new_message.save()
        return new_message


class Message(models.Model):
    text = models.TextField()
    channel = models.ForeignKey('chat.Channel', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='receiver')
    sent_at = models.DateTimeField(auto_now_add=True)
