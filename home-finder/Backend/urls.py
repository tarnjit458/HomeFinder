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
	path("user_regi/", views.UserRegistrationView.as_view(), name="user_regi"),
	path("regi_success/", views.UserRegiSuccessView.as_view(), name="user_regi_success"),
	path("logout/", views.UserLogoutView.as_view(), name="logout"),
	path("login/", views.UserLoginView.as_view(), name="login"),
	path('member/<int:pk>', views.MemberPageView.as_view(), name='member'),
	path('member/<int:pk>/house_regi/', views.register_house, name='house_regi'),
	path('member/<int:pk>/house_list/', views.HouseListView.as_view(), name='house_list'),
	path('member/<int:pk>/house_detail/<int:house_pk>', views.HouseDetailView.as_view(), name='house_detail'),
	path('search/', views.searchView, name='search'),
	path('allUsers/', views.UserView., name='users'),
	path('allHouses/', views.HouseView, name='house'),

]
