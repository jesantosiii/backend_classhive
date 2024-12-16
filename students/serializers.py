# students/serializers.py
from rest_framework import serializers

from accounts.models import CustomUser
from quizzes.serializers import QuizSerializer
from .models import StudentClasses
from teachers.models import Classroom

class JoinClassSerializer(serializers.ModelSerializer):
    class_code = serializers.CharField(write_only=True)  # Class code for the classroom

    class Meta:
        model = StudentClasses
        fields = ['class_code']  # Only require the class code

    def validate(self, attrs):
        # Validate the class code
        class_code = attrs.get('class_code')
        classroom = Classroom.objects.filter(class_code=class_code).first()
        if not classroom:
            raise serializers.ValidationError({"class_code": "Invalid class code."})

        # Fetch the authenticated user from the context
        student = self.context['request'].user

        # Check if the user is already enrolled
        if StudentClasses.objects.filter(student=student, classroom=classroom).exists():
            raise serializers.ValidationError("You are already enrolled in this class.")

        # Attach the validated classroom to the serializer context
        self.context['classroom'] = classroom
        return attrs

    def create(self, validated_data):
        # Fetch the authenticated user and the validated classroom
        student = self.context['request'].user
        classroom = self.context['classroom']

        # Create the StudentClasses instance
        student_class = StudentClasses.objects.create(student=student, classroom=classroom)
        return student_class

class StudentClassesSerializer(serializers.ModelSerializer):
    classroom = serializers.SerializerMethodField()
    quizzes = serializers.SerializerMethodField()

    class Meta:
        model = StudentClasses
        fields = ['id', 'classroom', 'quizzes']

    def get_classroom(self, obj):
        # Provide necessary fields about the classroom
        return {
            'id': obj.classroom.id,
            'class_name': obj.classroom.class_name,
            'subject': obj.classroom.subject,
            'teacher': f"{obj.classroom.teacher.first_name} {obj.classroom.teacher.last_name}"
        }

    def get_quizzes(self, obj):
        # Get all quizzes related to the classroom of the student
        quizzes = obj.classroom.quizzes.all()  # This uses the reverse relationship 'quizzes'

        # Serialize the quizzes using QuizSerializer
        return QuizSerializer(quizzes, many=True).data

