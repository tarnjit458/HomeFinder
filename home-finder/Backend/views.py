from django.shortcuts import render, redirect, resolve_url
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import CreateView, DetailView, TemplateView
from django.views import generic
from django.conf import settings
from .models import User, House
from .forms import LoginForm, UserRegistrationForm, HouseRegistrationForm

import stripe

# Create your views here.
def homepage(request):
	return render(request=request,
				  template_name="Backend/home.html",
				  context={})

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

