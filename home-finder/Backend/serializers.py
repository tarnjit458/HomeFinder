from rest_framework import serializers
from .models import User, House, Application

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'first_name', 'last_name', 'address', 'city', 'state', 'zip_code', 'phone', 'email', 'date_joined']

class HouseSerializer(serializers.ModelSerializer):
	owner = UserSerializer()
	class Meta:
		model = House
		fields = ['id', 'address', 'city', 'state', 'zip_code', 'sqft', 'bedrooms', 'bathrooms', 'flooring', 'parking', 'year_built', 'cost', 'description', 'for_sale', 'owner', 'registered_at', 'sold', "on_loan", "image"]

class RegistrationSerializer(serializers.ModelSerializer):

	password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

	class Meta:
		model = User
		fields = ['email', 'password', 'password2']
		extra_kwargs = {
			'password': {'write_only': True}
		}

	def save(self):
		user = User (
				email = self.validated_data['email']
			)

		password = self.validated_data['password']
		password2 = self.validated_data['password2']

		if password != password2:
			raise serializers.ValidationError({'password': 'Passwords must match.'})
		user.set_password(password)
		user.save()
		return user
		
class ApplicationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Application
		fields = ['user', 'house', 'employment', 'credit_score', 'offer', 'status', 'date_applied']
