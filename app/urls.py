"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include
from app import views


urlpatterns = [
    path('', login_required(TemplateView.as_view(template_name='base.html')), name='chat-app'),
    path('', include('django.contrib.auth.urls')),
    path('api/', include('api.urls')),
    path('register/', views.register, name='register'),
    path('admin/', admin.site.urls),
]
