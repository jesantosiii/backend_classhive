from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
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
