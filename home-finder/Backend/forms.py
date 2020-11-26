from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import get_user_model
from django.forms import ModelForm
from .models import House;

User = get_user_model()

class LoginForm(AuthenticationForm):
	class Meta:
		model = User

	def __init__(self, *args, **kw):
		super().__init__(*args, **kw)
		for field in self.fields.values():
			field.widget.attrs['class'] = 'form-control'
			field.widget.attrs['placeholder'] = field.label

class UserRegistrationForm(UserCreationForm):
	class Meta:
		model = User
		fields = ( 'first_name', 'last_name', 'address', 'city', 'state', 'zip_code', 'phone', 'email', 'role')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in self.fields.values():
			field.widget.attrs['class'] = 'form-control'
			
class HouseRegistrationForm(ModelForm):
	class Meta:
		model = House;
		fields = ('address', 'city', 'state', 'zip_code', 'cost', 'for_sale', 'description')
		labels = {
			'address': 'Address',
			'city': 'City',
			'state': 'State',
			'zip_code': 'Zip code',
			'cost': 'Cost',
			'for_sale': 'For sale',
			'description': 'Description'
		}
