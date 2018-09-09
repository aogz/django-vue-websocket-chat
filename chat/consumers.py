from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import async_to_sync
from chat.models import Channel
from django.db.models import Q
from api.serializers import MessageSerializer


class ChatConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.join_current_user_channels()

    async def disconnect(self, close_code):
        pass

    async def receive_json(self, content, **kwargs):
        command = content.get('command')

        try:
            if command == 'join':
                await self.channel_layer.group_add(str(content["chat_id"]), self.channel_name)
                if str(content["chat_id"]) not in self.chats:
                    self.chats.append(content["chat_id"])

            elif command == 'channel_message':
                channel = Channel.objects.get(id=content['chat_id'])
                message = content["message"]
                sender = self.scope['user']
                message = await database_sync_to_async(channel.add_message)(message, sender)

                data = {
                    "chat_id": content["chat_id"],
                    "type": "chat.message",
                    **MessageSerializer(message).data
                }

                await self.channel_layer.group_send(str(content["chat_id"]), data)

            elif command == 'private_message':
                channel, created = Channel.objects.get_or_create(name=content['chat_id'], is_private=True)
                message = content["message"]
                sender = self.scope['user']
                members = content['chat_id'].split('__')
                members.remove(self.scope['user'].username)
                receiver = members[0]
                message = await database_sync_to_async(channel.add_message)(message, sender, receiver)

                data = {
                    "chat_id": content["chat_id"],
                    "type": "chat.message",
                    **MessageSerializer(message).data
                }

                await self.channel_layer.group_send(self.scope['user'].username, data)
                if self.scope['user'].username != receiver:
                    await self.channel_layer.group_send(receiver, data)

        except Exception as e:
            await self.send_json({'error': str(e)})

    async def chat_message(self, event):
        await self.send_json(event)

    async def get_current_user_channels(self):
        qs = Channel.objects.filter()
        return [str(channel.id) for channel in qs] + [self.scope['user'].username]

    async def join_current_user_channels(self):
        self.chats = await self.get_current_user_channels()
        for channel in self.chats:
            await self.channel_layer.group_add(str(channel), self.channel_name)
