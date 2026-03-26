from django.urls import path

from . import views

app_name = 'cv_edwar'

urlpatterns = [
    path('', views.index, name='index'),
]
