from django.shortcuts import render, redirect, resolve_url
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import CreateView, DetailView, TemplateView
from django.views import generic

from django.conf import settings
from .models import User, House, Application, Schedule
from .forms import LoginForm, UserRegistrationForm, HouseRegistrationForm
import stripe

from django.http import Http404, HttpResponseRedirect, HttpRequest, HttpResponse
from django.db.models import Q
from django.http import JsonResponse
from django.core import serializers
from .serializers import HouseSerializer, UserSerializer, RegistrationSerializer, ApplicationSerializer, ScheduleSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import JSONParser
  
# Create your views here.

def homepage(request):
	return render(request=request,
				  template_name="Backend/home.html",
				  context={})

class HouseList(generics.ListAPIView):        
	queryset = House.objects.all()  
	serializer_class = HouseSerializer 


class UserList(generics.ListAPIView):         
	queryset = User.objects.all()  
	serializer_class = UserSerializer

class CustomAuthToken(ObtainAuthToken):
	def post(self, request, *args, **kwargs):
		serializer = self.serializer_class(data=request.data, context={'request': request})
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		token = Token.objects.get(user=user)
		return JsonResponse({
			'token': token.key,
			'user_id': user.pk
		})

@api_view(['POST'],)
def registration_view(request):

	if request.method == 'POST':
		serializer = RegistrationSerializer(data = request.data)
		data = {}
		if serializer.is_valid():
			user = serializer.save()
			data['response'] = "successfully registered a new user"
			data['email'] = user.email
			data['role'] = user.role
			token = Token.objects.get(user=user).key
			data['token'] = token 
		else:
			data = serializer.errors
		return JsonResponse(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rent_search_view(request):
	if request.method == 'GET':
		#data = JSONParser().parse(request)
		#print (data)
		search = request.GET.get('search')
		queryset = House.objects.filter((Q(address__icontains=search) | Q(zip_code__icontains=search) | Q(city__icontains=search) | Q(state__icontains=search)), Q(for_sale = '0'))
		if queryset:
			serializer = HouseSerializer(queryset, many=True)
			return JsonResponse(serializer.data, safe=False)
		else:
			message = "No match records"
			return JsonResponse(message, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def buy_search_view(request):
	if request.method == 'GET':
		#data = JSONParser().parse(request)
		#print (data)
		search = request.GET.get('search')
		queryset = House.objects.filter((Q(address__icontains=search) | Q(zip_code__icontains=search) | Q(city__icontains=search) | Q(state__icontains=search)), Q(for_sale = '1'))
		if queryset:
			serializer = HouseSerializer(queryset, many=True)
			return JsonResponse(serializer.data, safe=False)
		else:
			message = "No match records"
			return JsonResponse(message, safe=False)


@api_view(['POST', 'DELETE'],)
@permission_classes([IsAuthenticated])
def register_house(request):
	print (request.user)

	if request.method == 'POST':
		print(request.data)
		"""
		if hasattr(request.data, '_mutable'):
			_mutable = request.data._mutable
			request.data._mutable = True
			request_data['owner'] = request.user
			request.data._mutable = _mutable
			serializer = HouseSerializer(data = request.data)
		else:
			request_data = request.data
			request_data['owner'] = request.user
			serializer = HouseSerializer(data = request_data)		
		data = {}
		if serializer.is_valid():
			house = serializer.save()
			data['response'] = "successfully registered a new house"
		else:
			data = serializer.errors
		return JsonResponse(data)
		"""
		house = House()
		house.address = request.data['address']
		house.city = request.data['city']
		house.state = request.data['state']
		house.zip_code = request.data['zip_code']
		house.cost = request.data['cost']
		house.description = request.data['description']
		house.for_sale = request.data['for_sale']
		house.image = request.data['image']
		house.owner = request.user
		house.save()
		return JsonResponse({
			'message': "successfully registered a new house",
		})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def show_house_detail(request):
	if request.method == 'GET':
		house = House.objects.get(id=request.data['house_id']);
		return JsonResponse({
			'house': HouseSerializer(house).data,
		})
		
@api_view(['POST'],)
@permission_classes([IsAuthenticated])
def send_application(request):
	if request.method == 'POST':		
		application = Application()
		application.user = request.user
		application.house = House.objects.get(id=request.data['house_id'])
		application.employment = request.data['employment']
		application.credit_score = request.data['credit_score']
		application.offer = request.data['offer']
		application.save()
		
		return JsonResponse({
			'message': "application sent",
		})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def show_application_for_user(request):
	if request.method == 'GET':
		try:
			queryset = Application.objects.filter(user_id=request.user.id)
			return JsonResponse({
				'application': ApplicationSerializer(queryset, many=True).data,
			})
		except Application.DoesNotExist:
			return JsonResponse({
				'application': ApplicationSerializer(set()).data,
			})
		
@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def show_application_for_owner(request):
	if request.method == 'GET':
		house_set = House.objects.filter(owner_id=request.user.id)
		application_set = set()
		for house in house_set:
			try:
				application = Application.objects.get(house_id=house.id)
				application_set.add(application)
			except Application.DoesNotExist:
				pass
		return JsonResponse({
			'application': ApplicationSerializer(application_set, many=True).data,
		})

		
@api_view(['POST'],)
@permission_classes([IsAuthenticated])
def approve_application(request):
	if request.method == 'POST':
		try:
			application = Application.objects.get(id=request.data['application_id']);
			application.status = "Approved";
			application.save();
			return JsonResponse({
				'message': "application approved",
			})
		except Application.DoesNotExist:
			return JsonResponse({
				'message': "no matching application",
			})
		
@api_view(['POST'],)
@permission_classes([IsAuthenticated])
def reject_application(request):
	if request.method == 'POST':
		try:
			application = Application.objects.get(id=request.data['application_id']);
			application.status = "Rejected";
			application.save();
			return JsonResponse({
				'message': "application rejected",
			})
		except Application.DoesNotExist:
			return JsonResponse({
				'message': "no matching application",
			})

@api_view(['POST'],)
@permission_classes([IsAuthenticated])
def schedule_appointment(request):
	if request.method == 'POST':		
		schedule = Schedule()
		schedule.user = request.user
		schedule.house = House.objects.get(id=request.data['house_id'])
		schedule.date = request.data['date']
		schedule.time = request.data['time']
		schedule.party_size = request.data['party_size']
		schedule.save()
		message = "successfully schedule an appointment"
		return JsonResponse(message, safe=False)

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def display_schedule(request):
	if request.method == 'GET':
		try:
			queryset = Schedule.objects.filter(house_id=request.GET.get('house_id'))
			return JsonResponse({
				'schedule': ScheduleSerializer(queryset, many=True).data,
			})
		except Schedule.DoesNotExist:
			return JsonResponse({
				'schedule': ScheduleSerializer(set()).data,
			})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def display_application(request):
	if request.method == 'GET':
		try:
			queryset = Application.objects.filter(house_id=request.GET.get('house_id'))
			return JsonResponse({
				'application': ApplicationSerializer(queryset, many=True).data,
			})
		except Application.DoesNotExist:
			return JsonResponse({
				'application': ApplicationSerializer(set()).data,
			})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def display_house_by_user(request):
	if request.method == 'GET':
		try:
			queryset = House.objects.filter(owner_id=request.user.id, for_sale=request.GET.get('for_sale'))
			return JsonResponse({
				'house': HouseSerializer(queryset, many=True).data,
			})
		except House.DoesNotExist:
			return JsonResponse({
				'house': HouseSerializer(set()).data,
			})

@api_view(['PUT', 'DELETE'],)
@permission_classes([IsAuthenticated])
def edit_house(request):
	try: 
		house = House.objects.get(id=request.GET.get("house_id"))
	except House.DoesNotExist:
		return JsonResponse({'Message': 'This house does not exist.'})
	
	if request.method == 'PUT':
		house.address = request.data['address']
		house.city = request.data['city']
		house.state = request.data['state']
		house.zip_code = request.data['zip_code']
		house.cost = request.data['cost']
		house.description = request.data['description']
		house.for_sale = request.data['for_sale']
		house.image = request.data['image']
		house.owner = request.user
		house.save()
		return JsonResponse({
			'message': "successfully edited a house",
		})
	
	elif request.method == 'DELETE':
		house.delete()
		return JsonResponse({'message': 'House was deleted successfully!'})

@api_view(['DELETE'],)
@permission_classes([IsAuthenticated])
def delete_user(request):
	if request.method == 'DELETE':
		try:
			user = User.objects.get(id=request.GET.get("user_id"))
			user.delete()
			return JsonResponse({
				'message': "successfully delete a user",
			})
		except User.DoesNotExist:
			return JsonResponse({'message': 'This user does not exist.'})

