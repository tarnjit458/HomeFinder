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
from rest_framework.authtoken.views import obtain_auth_token

app_name = "Backend"

urlpatterns = [
	path('api/allUsers/', views.UserList.as_view(), name='user'),
	path('api/allHouses/', views.HouseList.as_view(), name='house'),
	path('api/user_register/', views.registration_view, name='user_register'),
	path('api/login/', views.CustomAuthToken.as_view(), name='login'),
	path('api/register_house/', views.register_house, name='house_register'),
	path('api/rent_search/', views.rent_search_view, name='rent_search'),
	path('api/buy_search/', views.buy_search_view, name='buy_search'),
	path('api/house_detail/', views.show_house_detail, name='house_detail'),
	path('api/send_application/', views.send_application, name='send_application'),
	path('api/show_application_for_user/', views.show_application_for_user, name='show_application_for_user'),
	path('api/show_application_for_owner/', views.show_application_for_owner, name='show_application_for_owner'),
	path('api/approve_application/', views.approve_application, name='approve_application'),
	path('api/reject_application/', views.reject_application, name='reject_application'),
	path('api/schedule_appointment/', views.schedule_appointment, name='schedule_appointment'),
	path('api/display_schedule/', views.display_schedule, name='display_schedule'),
	path('api/display_application/', views.display_application, name='display_application'),
	path('api/display_application_by_user/', views.display_application_by_user, name='display_application_by_user'),
	path('api/display_buy_by_user/', views.display_buy_by_user, name='display_buy_by_user'),
        path('api/display_rental_by_user/', views.display_rental_by_user, name="display_rental_by_user"),
	path('api/edit_house/<int:id>', views.edit_house, name='edit_house'),
	path('api/delete_user/', views.delete_user, name='delete_user'),
	path('api/add_favorite/', views.add_favorite, name='add_favorite'),
	path('api/show_favorite_list/', views.show_favorite_list, name='show_favorite_list'),
	path('api/show_favorite_id_by_home/', views.show_favorite_id_by_home, name='show_favorite_id_by_home'),
	path('api/delete_favorite/', views.delete_favorite, name='delete_favorite'),
	path('api/update_schedule/<int:id>', views.update_schedule, name='update_schedule'),
	path('api/delete_schedule/<int:id>', views.delete_schedule, name='delete_schedule'),
]
