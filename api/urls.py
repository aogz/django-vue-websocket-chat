from django.urls import path
from api import views


urlpatterns = [
    path('messages/', views.MessagesListView.as_view(), name='messages'),
    path('channels/', views.ChannelsListCreateView.as_view(), name='channels'),
    path('users/', views.UsersListView.as_view(), name='users'),
]
