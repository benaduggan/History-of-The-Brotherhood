import string
import random

from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

from django.conf import settings

class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        user = self.model(email=email,
                          last_login=now,
                          date_joined=now,
                          **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        u = self.create_user(email, password, **extra_fields)
        u.is_active = True
        u.save(using=self._db)
        return u

class Account(AbstractBaseUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role', 'is_verified']
    ROLES = [(1, 'admin'), (2, 'user')]

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    is_verified = models.BooleanField(default=False)
    role = models.IntegerField(choices=ROLES, default=2)

    date_joined = models.DateTimeField(default=timezone.now)

    objects = AccountManager()

    class Meta:
        verbose_name = 'account'
        verbose_name_plural = 'accounts'

    def __unicode__(self):
        return self.email

    def get_username(self):
        return self.email

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
