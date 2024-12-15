from django.contrib import admin
from .models import StudentClasses

class StudentClassesAdmin(admin.ModelAdmin):
    list_display = ('student', 'classroom', 'class_id')  # Include class_id instead
    ordering = ('student', 'classroom')  # Valid ordering fields
    search_fields = ('student__username', 'classroom__class_name')

    def class_id(self, obj):
        return obj.classroom.id
    class_id.admin_order_field = 'classroom__id'
    class_id.short_description = 'Class ID'

admin.site.register(StudentClasses, StudentClassesAdmin)
