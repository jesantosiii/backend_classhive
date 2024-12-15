from rest_framework import serializers
from .models import Classroom
from accounts.models import CustomUser

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email']

class ClassroomSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    students = serializers.SerializerMethodField()

    class Meta:
        model = Classroom
        fields = ['id', 'class_name', 'year_level', 'section', 'subject', 'teacher', 'class_code', 'students', 'created_at']

    def get_students(self, obj):
        # Efficiently fetching only required fields (id, first_name, last_name) to return as a list of dictionaries
        return [
            {"id": student_class.student.id, "first_name": student_class.student.first_name, "last_name": student_class.student.last_name}
            for student_class in obj.student_classes.all()
        ]

    def create(self, validated_data):
        # Automatically assign the teacher to the classroom based on the authenticated user
        validated_data['teacher'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        teacher = validated_data.pop('teacher', None)  # Remove teacher from validated data, as it should not be updated
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
