from rest_framework import serializers
from .models import User, House

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'first_name', 'last_name', 'address', 'phone', 'email', 'date_joined')

class HouseSerializer(serializers.ModelSerializer):
	class Meta:
		model = House
		fields = ('id', 'address', 'city', 'state', 'zip_code', 'cost', 'description', 'for_sale', 'owner', 'registered_at', 'sold')