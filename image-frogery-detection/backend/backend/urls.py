"""backend URL Configuration

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
from django.contrib import admin
from django.conf.urls import include,url
from django.urls import path, include              # add this
from rest_framework import routers
from ImageFrogery import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    url(r'^api/metadata/$', views.get_metadata),
    url(r'^api/digest/$', views.get_digest),
    url(r'^api/upload_image/$', views.upload_image),
    url(r'^api/upload_image_url/$', views.upload_image_url),
    url(r'^api/ela/$', views.get_ela),
    url(r'^api/originalimg/$', views.get_originalimg),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
