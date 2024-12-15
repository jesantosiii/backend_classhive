from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')],
        blank=True,
        null=True
    )
    role = models.CharField(
        max_length=10,
        choices=[('Teacher', 'Teacher'), ('Student', 'Student')],
        blank=False
    )
    confirmation_code = models.CharField(max_length=6, blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"

