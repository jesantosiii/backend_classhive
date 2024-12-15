# teachers/admin.py
from django.contrib import admin
from students.models import StudentClasses  # Import StudentClasses from the student app
from .models import Classroom
from accounts.models import CustomUser

# Inline admin to manage students in the classroom
class StudentClassesInline(admin.TabularInline):
    model = StudentClasses
    extra = 0  # No extra blank rows
    readonly_fields = ['student_id', 'student_name']  # Display student ID and name
    can_delete = False  # Optionally, you can make students unremovable from here

    # Adding the student ID and name to the inline view
    def student_id(self, obj):
        return obj.student.id  # Show the student ID

    def student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"  # Show the full name of the student

    student_id.short_description = 'Student ID'
    student_name.short_description = 'Student Name'

class ClassroomAdmin(admin.ModelAdmin):
    list_display = ('class_id', 'class_name', 'year_level', 'section', 'subject', 'teacher', 'class_code', 'created_at', 'student_count')
    search_fields = ('class_name', 'class_code', 'section', 'subject', 'teacher__first_name', 'teacher__last_name')
    list_filter = ('year_level', 'subject', 'teacher')
    inlines = [StudentClassesInline]  # Include the student inline for classroom
    readonly_fields = ('class_code', 'teacher', 'created_at')

    def student_count(self, obj):
        # Return the number of students linked to this classroom
        return obj.student_classes.count()
    student_count.short_description = 'Number of Students'

    def class_id(self, obj):
        return obj.id  # Display the class ID
    class_id.short_description = 'Class ID'  # Set the label for the class ID

admin.site.register(Classroom, ClassroomAdmin)
