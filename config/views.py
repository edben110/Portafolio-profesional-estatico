from django.http import Http404
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')


def seccion_placeholder(request, numero):
    if numero not in (1, 2, 4):
        raise Http404('Seccion no disponible')
    return render(request, 'seccion_placeholder.html', {'numero': numero})
