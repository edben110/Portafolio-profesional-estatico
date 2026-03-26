from django.http import Http404
from django.shortcuts import render, redirect


def home(request):
    """Landing page with 4 buttons for future app sections."""
    secciones = [
        {"numero": 1, "titulo": "CV Sebastian"},
        {"numero": 2, "titulo": "CV Edwar"},
        {"numero": 3, "titulo": "CV Daniel"},
        {"numero": 4, "titulo": "HV Juanma"},
    ]
    return render(request, "home.html", {"secciones": secciones})


def seccion_placeholder(request, numero):
    """Redirect each section to its corresponding portfolio."""
    if numero not in (1, 2, 3, 4):
        raise Http404("Seccion no disponible")
    
    # Redirigir cada sección a su portafolio
    if numero == 1:
        return redirect('/cv-sebastian/')
    elif numero == 2:
        return redirect('/cv-edwar/')
    elif numero == 3:
        return redirect('/cv-daniel/')
    elif numero == 4:
        return redirect('/hv-juanma/')
    
    return render(request, "seccion_placeholder.html", {"numero": numero})