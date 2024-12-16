from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Classroom
from .serializers import ClassroomSerializer

class IsTeacher(permissions.BasePermission):
    """
    Custom permission to only allow teachers to access classroom-related views.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Teacher'

class ClassroomListCreateView(generics.ListCreateAPIView):
    """
    View to list classrooms or create a new classroom.
    Only accessible to authenticated teachers.
    """
    serializer_class = ClassroomSerializer
    permission_classes = [IsTeacher]
    pagination_class = PageNumberPagination  # Correct pagination class

    def get_queryset(self):
        """
        This method ensures that a teacher can only access classrooms they have created.
        """
        return Classroom.objects.filter(teacher=self.request.user)

    def perform_create(self, serializer):
        """
        This method automatically assigns the teacher who creates the classroom.
        """
        serializer.save(teacher=self.request.user)

class ClassroomDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete a classroom.
    Only accessible to teachers who created the classroom.
    """
    serializer_class = ClassroomSerializer
    permission_classes = [IsTeacher]

    def get_queryset(self):
        """
        Ensure that a teacher can only access classrooms they have created.
        """
        return Classroom.objects.filter(teacher=self.request.user)


class ClassroomPeopleView(APIView):
    """
    Retrieve all people (teacher and students) in a classroom.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, class_code):
        # Retrieve the classroom using the provided class_code
        classroom = get_object_or_404(Classroom, class_code=class_code)

        # Fetch teacher details
        teacher = {
            "id": classroom.teacher.id,
            "first_name": classroom.teacher.first_name,
            "last_name": classroom.teacher.last_name,
            "email": classroom.teacher.email,
            "role": "Teacher",
        }

        # Fetch students in the classroom
        students = [
            {
                "id": student_class.student.id,
                "first_name": student_class.student.first_name,
                "last_name": student_class.student.last_name,
                "email": student_class.student.email,
                "role": "Student",
            }
            for student_class in classroom.student_classes.all()
        ]

        # Combine teacher and students into a single list
        people = [teacher] + students

        return Response({
            "classroom": {
                "id": classroom.id,
                "class_name": classroom.class_name,
                "year_level": classroom.year_level,
                "section": classroom.section,
                "subject": classroom.subject,
                "class_code": classroom.class_code,
            },
            "people": people,
        })