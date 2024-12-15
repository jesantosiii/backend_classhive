from django.db import models
import string
import random
from accounts.models import CustomUser

class Classroom(models.Model):
    class_name = models.CharField(max_length=100)
    year_level = models.IntegerField()
    section = models.CharField(max_length=50)
    subject = models.CharField(max_length=100)
    teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="classes")
    class_code = models.CharField(max_length=8, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.class_name} - {self.year_level} {self.section}"

    def save(self, *args, **kwargs):
        if not self.class_code:
            self.class_code = self.generate_class_code()
        super().save(*args, **kwargs)

    @staticmethod
    def generate_class_code():
        characters = string.ascii_uppercase + string.digits
        while True:
            code = ''.join(random.choice(characters) for _ in range(8))
            if not Classroom.objects.filter(class_code=code).exists():
                return code

    def student_count(self):
        return self.student_classes.count()

    class Meta:
        verbose_name = "Classroom"
        verbose_name_plural = "Classrooms"
