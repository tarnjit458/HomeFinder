from django.shortcuts import render, redirect, resolve_url
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import CreateView, DetailView, TemplateView
from django.views import generic

from django.conf import settings
from .models import User, House
from .forms import LoginForm, UserRegistrationForm, HouseRegistrationForm
import stripe

from django.http import Http404, HttpResponseRedirect, HttpRequest, HttpResponse
from django.db.models import Q
from django.http import JsonResponse
from django.core import serializers
from .serializers import HouseSerializer, UserSerializer, RegistrationSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
  
# Create your views here.

def homepage(request):
	return render(request=request,
				  template_name="Backend/home.html",
				  context={})

"""
class UserRegistrationView(CreateView):
	form_class = UserRegistrationForm
	template_name = "Backend/user_regi.html"

	def get_success_url(self):
		return resolve_url("Backend:user_regi_success")

class UserRegiSuccessView(TemplateView):
	template_name = "Backend/user_regi_success.html"


class UserLoginView(LoginView):
	form_class = LoginForm
	template_name = "Backend/login.html"

	def get_success_url(self):
		return resolve_url('Backend:member', pk=self.request.user.pk)


class UserLogoutView(LoginRequiredMixin, LogoutView):
	template_name = "Backend/member_page.html"

class MemberOnlyMixin(UserPassesTestMixin):
	raise_exception = True

	def test_func(self):
		user = self.request.user
		return user.pk == self.kwargs['pk']

class MemberPageView(MemberOnlyMixin, DetailView):
	model = User
	template_name = 'Backend/member_page.html'

def register_house(request, pk):
	if request.method == 'POST':
		form = HouseRegistrationForm(request.POST, House())
		if form.is_valid():
			new_house = form.save(commit=False)
			new_house.owner = User.objects.get(id=pk);
			new_house.save()
			return redirect('Backend:member', pk)
		else:
			for msg in form.error_messages:
				messages.error(request, f"{msg}:{form.error_messages}")
	params = {
		'title':'House Registration',
		'form':HouseRegistrationForm(),
	}
	return render(request, 'Backend/house_registration.html', params)

class HouseListView(generic.ListView):
    model = House
    template_name = 'Backend/house_list.html'
    context_object_name = 'house_list'


class HouseDetailView(generic.DetailView):
	model = House
	template_name = 'Backend/house_detail.html'
	
	def get(self, request, *args, **kwargs):
		house = House.objects.get(id=self.kwargs.get('house_pk'));
		return render(request, 'Backend/house_detail.html', {
			'publick_key': settings.STRIPE_PUBLIC_KEY,
			'house': house,
			'owner': User.objects.get(id=house.owner_id),
			'cost': house.cost * 100 # Convert cents into dollar
		})
		
	def post(self, request, *args, **kwargs):
		house = House.objects.get(id=self.kwargs.get('house_pk'))
		stripe.api_key = settings.STRIPE_SECRET_KEY
		token = request.POST['stripeToken']
		try:
			charge = stripe.Charge.create(
				amount=house.cost*100,
				currency='usd',
				source=token,
				description='E-mail:{} Name:{}'.format(
					request.user.email,
					request.user.first_name + " " +
					request.user.last_name),
			)
			house.sold = True
			house.save()
		except stripe.error.CardError as e:
			return render(request, 'Backend/payment_result.html', {
				'message': 'Your payment cannot be completed. The card has been declined.',
			})
		return render(request, 'Backend/payment_result.html', {
			'message': 'Your payment has been completed successfully.'
		})
"""

class HouseList(generics.ListAPIView):        
	queryset = House.objects.all()  
	serializer_class = HouseSerializer 


class UserList(generics.ListAPIView):         
	queryset = User.objects.all()  
	serializer_class = UserSerializer

@api_view(['POST'],)
def registration_view(request):

	if request.method == 'POST':
		serializer = RegistrationSerializer(data = request.data)
		data = {}
		if serializer.is_valid():
			user = serializer.save()
			data['response'] = "successfully registered a new user"
			data['email'] = user.email
			token = Token.objects.get(user=user).key
			data['token'] = token 
		else:
			data = serializer.errors
		return JsonResponse(data)

@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def searchView(request):
	if request.method == 'GET':
		#data = JSONParser().parse(request)
		#print (data)
		search = request.GET.get('search')
		queryset = House.objects.filter(Q(address__icontains=search) | Q(zip_code__icontains=search) | Q(city__icontains=search) | Q(state__icontains=search))
		if queryset:
			serializer = HouseSerializer(queryset, many=True)
			return JsonResponse(serializer.data, safe=False)
		else:
			message = "No match records"
			return JsonResponse(message, safe=False)


@api_view(['POST'],)
@permission_classes([IsAuthenticated])
def register_house(request):
	if request.method == 'POST':
		serializer = HouseSerializer(data = request.data)
		data = {}
		if serializer.is_valid():
			house = serializer.save()
			data['response'] = "successfully registered a new house"
		else:
			data = serializer.errors
		return JsonResponse(data)


class HouseDetailView(APIView):
	authentication_classes = [TokenAuthentication]
	permission_classes = [IsAuthenticated]
	model = House
	
	def get(self, request, pk, format=None):
		house = House.objects.get(id=pk);
		return JsonResponse({
			'publick_key': settings.STRIPE_PUBLIC_KEY,
			'house': HouseSerializer(house).data,
		})
		
	def post(self, request, pk, format=None):
		user = Token.objects.get(key=request.auth.key).user
		house = House.objects.get(id=pk)
		stripe.api_key = settings.STRIPE_SECRET_KEY
		token = request.POST['stripeToken']
		try:
			charge = stripe.Charge.create(
				amount=house.cost*100,
				currency='usd',
				source=token,
				description='E-mail:{} Name:{}'.format(
					user.email,
					user.first_name + " " +
					user.last_name),
			)
			house.sold = True
			house.save()
		except stripe.error.CardError as e:
			return JsonResponse({
				'message': 'Your payment cannot be completed. The card has been declined.',
			})
		return JsonResponse({
			'message': 'Your payment has been completed successfully.'
		})

