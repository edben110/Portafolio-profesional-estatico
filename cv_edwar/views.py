from django.shortcuts import render


def index(request):
	return render(request, 'cv_edwar/index.html')
