from rest_framework import serializers
from .models import User, House, Application, Schedule, Favorite
from django.core.validators import EmailValidator

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'first_name', 'last_name', 'address', 'city', 'state', 'zip_code', 'phone', 'email', 'role', 'date_joined']
		extra_kwargs = {
        'email': {'validators': [EmailValidator,]},
    	}

class HouseSerializer(serializers.ModelSerializer):
	owner = UserSerializer()
	class Meta:
		model = House
		fields = ['id', 'address', 'city', 'state', 'zip_code', 'sqft', 'bedrooms', 'bathrooms', 'flooring', 'parking', 'year_built', 'cost', 'description', 'for_sale', 'owner', 'registered_at', 'sold', "on_loan", "image"]

class RegistrationSerializer(serializers.ModelSerializer):

	password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

	class Meta:
		model = User
		fields = ['email', 'role', 'password', 'password2', 'first_name', 'last_name', 'address', 'city', 'state', 'zip_code', 'phone']
		extra_kwargs = {
			'password': {'write_only': True}
		}

	def save(self):
		user = User (
				email = self.validated_data['email'],
				role = self.validated_data['role'],
				first_name = self.validated_data['first_name'],
				last_name = self.validated_data['last_name'],
				address = self.validated_data['address'],
				city = self.validated_data['city'],
				state = self.validated_data['state'],
				zip_code = self.validated_data['zip_code'],
				phone = self.validated_data['phone'],
			)

		password = self.validated_data['password']
		password2 = self.validated_data['password2']


		if password != password2:
			raise serializers.ValidationError({'password': 'Passwords must match.'})
		user.set_password(password)
		user.save()
		return user
		
class ApplicationSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	user = UserSerializer()
	house = HouseSerializer()
	class Meta:
		model = Application
		fields = ['id', 'user', 'house', 'employment', 'credit_score', 'offer', 'status', 'date_applied']

class ScheduleSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	user = UserSerializer()
	house = HouseSerializer()
	class Meta:
		model = Schedule
		fields = ['id', 'user', 'house', 'date', 'time', 'party_size', 'created_at']
		
class FavoriteSerializer(serializers.ModelSerializer):
	id = serializers.ReadOnlyField()
	user = UserSerializer()
	house = HouseSerializer()
	class Meta:
		model = Favorite
		fields = ['id', 'user', 'house', 'date_added']

