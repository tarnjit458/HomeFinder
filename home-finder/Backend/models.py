from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class User(AbstractUser):
    first_name = models.CharField(_('first name'), max_length=50, blank=True)
    last_name = models.CharField(_('last name'), max_length=50, blank=True)
    address = models.CharField(_('home address'), max_length=100, blank=True)
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
