from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, firstname, lastname, content_category, password = None):
        if not email:
            raise ValueError("User must have an Email address")

        email = self.normalize_email(email)
        user = self.model(email = email, firstname = firstname, lastname = lastname, content_category = content_category)
        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length = 255, unique = True)
    # name = models.CharField(max_length = 255)
    firstname = models.CharField(max_length = 255)
    lastname = models.CharField(max_length = 255)
    content_category = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstname", "lastname", "content_category"]

    objects = UserAccountManager()

    def get_full_name(self):
        return self.name

    def __str__(self) -> str:
        return self.email
