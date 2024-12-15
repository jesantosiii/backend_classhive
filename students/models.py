from django.db import models
from accounts.models import CustomUser
from teachers.models import Classroom

class StudentClasses(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="student_classes")
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name="student_classes")

    class Meta:
        unique_together = ('student', 'classroom')

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.classroom.class_name}"

