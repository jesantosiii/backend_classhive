# students/views.py

from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from teachers.models import Classroom
from .models import StudentClasses
from .serializers import StudentClassesSerializer, JoinClassSerializer


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Student'


class JoinClassView(generics.CreateAPIView):
    serializer_class = JoinClassSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensure only authenticated users can join

    def get_serializer_context(self):
        # Pass the request to the serializer context
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student_class = serializer.save()

        # Prepare response
        response_data = {
            "message": f"Student {student_class.student.username} has successfully joined {student_class.classroom.class_name}.",
            "student": student_class.student.id,
            "classroom_name": student_class.classroom.class_name,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

class LeaveClassView(APIView):
    permission_classes = [IsStudent]

    def post(self, request):
        class_code = request.data.get('class_code')
        if not class_code:
            return Response({"error": "Class code is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            classroom = Classroom.objects.get(class_code=class_code)
            student_class = StudentClasses.objects.filter(student=request.user, classroom=classroom).first()
            if student_class:
                student_class.delete()
                return Response({"message": "Successfully left the class."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "You are not enrolled in this class."}, status=status.HTTP_400_BAD_REQUEST)
        except Classroom.DoesNotExist:
            return Response({"error": "Invalid class code."}, status=status.HTTP_400_BAD_REQUEST)


class StudentClassesListView(generics.ListAPIView):
    serializer_class = StudentClassesSerializer
    permission_classes = [IsStudent]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return StudentClasses.objects.filter(student=self.request.user)