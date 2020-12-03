from .models import User, House, Application, Schedule, Favorite
from django.db.models import Q
from django.http import JsonResponse
from django.core import serializers
from .serializers import HouseSerializer, UserSerializer, RegistrationSerializer, ApplicationSerializer, ScheduleSerializer, FavoriteSerializer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
  
# Create your views here.
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
			'user_id': user.pk,
			'role': user.role
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
			data['first_name'] = user.first_name
			data['last_name'] = user.last_name
			data['address'] = user.address
			data['city'] = user.city
			data['state'] = user.state
			data['zip_code'] = user.zip_code
			data['phone'] = user.phone

			token = Token.objects.get(user=user).key
			data['token'] = token 
		else:
			data = serializer.errors
		return JsonResponse(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def rent_search_view(request):
	if request.method == 'GET':
		search = request.GET.get('search')
		queryset = House.objects.filter((Q(address__icontains=search) | Q(zip_code__icontains=search) | Q(city__icontains=search) | Q(state__icontains=search)), Q(on_loan = '1'))
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
		search = request.GET.get('search')
		queryset = House.objects.filter((Q(address__icontains=search) | Q(zip_code__icontains=search) | Q(city__icontains=search) | Q(state__icontains=search)), Q(on_loan = '0'))
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
		house = House()
		house.address = request.data['address']
		house.city = request.data['city']
		house.state = request.data['state']
		house.zip_code = request.data['zip_code']
		house.cost = request.data['cost']
		house.description = request.data['description']
		house.for_sale = request.data['for_sale']
		house.on_loan = request.data['on_loan']
		house.sqft = request.data['sqft']
		house.bathrooms = request.data['bathrooms']
		house.bedrooms = request.data['bedrooms']
		house.flooring = request.data['flooring']
		house.parking = request.data['parking']
		house.year_built = request.data['year_built']
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
                        application = Application.objects.get(id=request.data.get('data')['application_id']);
                        application.status = "Approved";
                        print(application.house.id)
                        house = House.objects.get(id=application.house.id);
                        house.for_sale = 0;
                        house.save();
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
	print(request.data.get('data'))
	if request.method == 'POST':
		try:
			application = Application.objects.get(id=request.data.get('data')['application_id']);
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
				'Schedule': ScheduleSerializer(queryset, many=True).data,
			})
		except Schedule.DoesNotExist:
			return JsonResponse({
				'Message': ScheduleSerializer(set()).data,
			})

@api_view(['PUT'],)
@permission_classes([IsAuthenticated])
def update_schedule(request, id):
	try: 
		schedule = Schedule.objects.get(id=id)
	except Schedule.DoesNotExist:
		return JsonResponse({'Message': 'This schedule does not exist.'})
	
	if request.method == 'PUT':
		data = request.data.get('data')
		schedule.date = data['date']
		schedule.time = data['time']
		schedule.party_size = data['party_size']
		schedule.save()
		return JsonResponse({
			'Message': "successfully updated a schedule",
		})

@api_view(['DELETE'],)
@permission_classes([IsAuthenticated])
def delete_schedule(request, id):
	if request.method == 'DELETE':
		try: 
			schedule = Schedule.objects.get(id=id)
		except Schedule.DoesNotExist:
			return JsonResponse({'Message': 'This schedule does not exist.'})

		schedule.delete()
		return JsonResponse({
			'Message': "successfully deleted a schedule.",
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
def display_application_by_user(request):
	if request.method == 'GET':
		try:
			queryset = Application.objects.filter(user_id=request.user, house_id=request.GET.get('house_id'))
			return JsonResponse({
				'application': ApplicationSerializer(queryset, many=True).data,
			})
		except Application.DoesNotExist:
			return JsonResponse({
				'application': ApplicationSerializer(set()).data,
			})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def display_buy_by_user(request):
	if request.method == 'GET':
		try:
			queryset = House.objects.filter(owner_id=request.user.id, on_loan=0)
			return JsonResponse({
				'house': HouseSerializer(queryset, many=True).data,
			})
		except House.DoesNotExist:
			return JsonResponse({
				'house': HouseSerializer(set()).data,
			})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def display_rental_by_user(request):
        if request.method == 'GET':
                try:
                        queryset = House.objects.filter(owner_id=request.user.id, on_loan=1)
                        return JsonResponse({
                            'house': HouseSerializer(queryset, many=True).data,
                        })
                except House.DoesNotExist:
                        return JsonResponse({
                            'house': HouseSerializer(set()).data,
                        })


@api_view(['PUT', 'DELETE'],)
@permission_classes([IsAuthenticated])
def edit_house(request, id):
	try: 
		house = House.objects.get(id=id)
	except House.DoesNotExist:
		return JsonResponse({'Message': 'This house does not exist.'})
	
	if request.method == 'PUT':
		data = request.data.get('data')
		house.address = data['address']
		house.city = data['city']
		house.state = data['state']
		house.zip_code = data['zip_code']
		house.cost = data['cost']
		house.description = data['description']
		house.sqft = data['sqft']
		house.bathrooms = data['bathrooms']
		house.bedrooms = data['bedrooms']
		house.flooring = data['flooring']
		house.parking = data['parking']
		house.year_built = data['year_built']
		house.image = data['image']
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


@api_view(['POST'],)
@permission_classes([IsAuthenticated])
def add_favorite(request):
	if request.method == 'POST':
		favorite = Favorite()
		favorite.user = request.user
		try:
			favorite.house = House.objects.get(id=request.data['house_id'])
			favorite.save()
			return JsonResponse({
				'message': 'successfully added to favorite',
			})
		except House.DoesNotExist:
			return JsonResponse({
				'message': 'no such house id',
			})
		
@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def show_favorite_list(request):
	if request.method == 'GET':
		favorite_set = Favorite.objects.filter(user_id=request.user.id)
		return JsonResponse({
			'favorite': FavoriteSerializer(favorite_set, many=True).data,	
		})

@api_view(['GET'],)
@permission_classes([IsAuthenticated])
def show_favorite_id_by_home(request):
	if request.method == 'GET':
		favorite_set = Favorite.objects.filter(user_id=request.user.id, house_id=request.GET.get('house_id'))
		return JsonResponse({
			'favorite': FavoriteSerializer(favorite_set, many=True).data,	
		})

@api_view(['DELETE'],)
@permission_classes([IsAuthenticated])
def delete_favorite(request):
	if request.method == 'DELETE':
		try:
			favorite = Favorite.objects.get(house_id=request.GET.get("house_id"))
			favorite.delete()
			return JsonResponse({
				'message': 'successfully deleted from favorite',
			})
		except Favorite.DoesNotExist:
			return JsonResponse({
				'message': 'no such favorite id',
			})

