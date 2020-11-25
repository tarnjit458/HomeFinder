from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class User(AbstractUser):
	first_name = models.CharField(_('first name'), max_length=50, blank=True)
	last_name = models.CharField(_('last name'), max_length=50, blank=True)
	address = models.CharField('address', max_length=100)
	city = models.CharField('city', max_length=100)
	state = models.CharField('state', max_length=100)
	zip_code = models.CharField('zip code', max_length=50)
	phone = models.CharField(_('phone number'), max_length=50, blank=True)
	email = models.EmailField(_('email address'), unique=True)
	date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

	EMAIL_FIELD = 'email'
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	class Meta:
		verbose_name = _('user')
		verbose_name_plural = _('users')

	@property
	def username(self):
		return self.email

class House(models.Model):
	address = models.CharField('address', max_length=100)
	city = models.CharField('city', max_length=100)
	state = models.CharField('state', max_length=100)
	zip_code = models.CharField('zip code', max_length=50)
	sqft = models.CharField('sqft', max_length=100)
	bedrooms = models.CharField('bedrooms', max_length=100)
	bathrooms = models.CharField('bathrooms', max_length=100)
	flooring = models.CharField('flooring', max_length=100)
	parking = models.CharField('parking', max_length=100)
	year_built = models.CharField('year_built', max_length=100)
	cost = models.IntegerField('cost', default=0)
	description = models.TextField('description')
	for_sale = models.BooleanField(default=False)
	owner = models.ForeignKey(User, verbose_name='owner', on_delete=models.CASCADE)
	registered_at = models.DateTimeField('degistered date', default=timezone.now)
	sold = models.BooleanField(default=False)
	on_loan = models.BooleanField(default=False)
	image = models.CharField('image url', max_length=500)
	
class Application(models.Model):
	user = models.ForeignKey(User, verbose_name='user', on_delete=models.CASCADE)
	house = models.ForeignKey(House, verbose_name='house', on_delete=models.CASCADE)
	employment = models.CharField('employment', max_length=100)
	credit_score = models.IntegerField('credit_score', default=0)
	offer = models.IntegerField('cost', default=0)
	status = models.IntegerField('status', default=0)
	date_applied = models.DateTimeField(_('date_applied'), default=timezone.now)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)
