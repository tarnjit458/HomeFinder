from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import get_user_model

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
		fields = ( 'first_name', 'last_name', 'address', 'phone', 'email')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in self.fields.values():
			field.widget.attrs['class'] = 'form-control'
