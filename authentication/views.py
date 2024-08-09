from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm

@login_required
def auth_home(request):
    return render(request, "auth_home.html")

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect("auth_home") # Redirect to home page but now logged in
    else:
        form = RegisterForm()
    return render(request, "register.html", {
        "form": form
    })

def login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return redirect("auth_home")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {
        "form": form
    })
