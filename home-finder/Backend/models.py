from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

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
	cost = models.IntegerField('cost', default=0)
	description = models.TextField('description')
	for_sale = models.BooleanField(default=False)
	owner = models.ForeignKey(User, verbose_name='owner', on_delete=models.CASCADE)
	registered_at = models.DateTimeField('degistered date', default=timezone.now)
	sold = models.BooleanField(default=False)
	on_loan = models.BooleanField(default=False)
