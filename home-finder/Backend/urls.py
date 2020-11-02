"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path
from . import views

#app_name = "main"
app_name = "Backend"

urlpatterns = [
    path("", views.homepage, name="homepage"),
    #path("register/", views.register, name="register"),
    #path("logout/", views.logout_request, name="logout"),
    path("register/", views.UserRegistrationView.as_view(), name="register"),
    path("regi_success/", views.UserRegiSuccessView.as_view(), name="regi_success"),
    path("logout/", views.UserLogoutView.as_view(), name="logout"),
	path("login/", views.UserLoginView.as_view(), name="login"),
	path('member/<int:pk>', views.MemberPageView.as_view(), name='member'),
    path('search/', views.searchView, name='search'),
]
