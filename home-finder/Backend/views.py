from django.shortcuts import render, redirect, resolve_url
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages

from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import CreateView, DetailView, TemplateView
#from django.urls import reverse
from django.views import generic
from .models import User, House
from .forms import LoginForm, UserRegistrationForm

from django.http import Http404, HttpResponseRedirect, HttpRequest
from django.db.models import Q
from django.http import JsonResponse
from django.core import serializers

# Create your views here.
def homepage(request):
	return render(request=request,
				  template_name="Backend/home.html",
				  context={})

"""
def homepage(request):
	return render(request=request,
				  template_name="main/home.html",
				  context={})

def register(request):
	if request.method == "POST":
		form = UserCreationForm(request.POST)
		if form.is_valid():
			user = form.save()
			username = form.cleaned_data.get('username')
			messages.success(request, f"New Account Created: {username}")
			login(request, user)
			messages.info(request, f"You are now logging in as: {username}")
			return redirect("main:homepage")
		else:
			for msg in form.error_messages:
				messages.error(request, f"{msg}:{form.error_messages}")

				
	form = UserCreationForm
	return render(request,
				  "main/register.html",
				  context={"form":form})

def logout_request(request):
	logout(request)
	messages.info(request, "Logged out successfully!")
	return redirect("main:homepage")
"""

class UserRegistrationView(CreateView):
	form_class = UserRegistrationForm
	template_name = "Backend/registration.html"

	def get_success_url(self):
		return resolve_url("Backend:regi_success")

class UserRegiSuccessView(TemplateView):
	template_name = "Backend/regi_success.html"

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

def searchView(request):
	if request.method == 'POST':
		search = request.POST.get('search')
		print (search)
		if search:
			match = House.objects.filter(Q(address__icontains=search) | Q(zip_code__icontains=search)| Q(city__icontains=search) | Q(state__icontains=search))
			if match:
				#match_json = serializers.serialize('json', match)
				print (match)
				#print (match_json)
				#return HttpResponse(match_json, content_type='application/json')
				return render(request, 'Backend/search.html', {'res': match})
			else:
				messages.error(request, 'no result found')
	return render(request, 'Backend/search.html')









