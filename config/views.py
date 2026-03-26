from django.http import Http404
from django.shortcuts import render


def home(request):
    """Landing page with 4 buttons for future app sections."""
    secciones = [
        {"numero": 1, "titulo": "Seccion 1"},
        {"numero": 2, "titulo": "Seccion 2"},
        {"numero": 3, "titulo": "Seccion 3"},
        {"numero": 4, "titulo": "Seccion 4"},
    ]
    return render(request, "home.html", {"secciones": secciones})


def seccion_placeholder(request, numero):
    """Temporary page for each section until real app routes are connected."""
    if numero not in (1, 2, 3, 4):
        raise Http404("Seccion no disponible")

    return render(request, "seccion_placeholder.html", {"numero": numero})
