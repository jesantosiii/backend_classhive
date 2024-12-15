from django.contrib import admin
from .models import CustomUser


# Customizing the User admin interface
class CustomUserAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('id', 'username', 'first_name', 'last_name', 'email', 'gender', 'role', 'is_email_verified')

    # Fields to filter the list by
    list_filter = ('gender', 'role', 'is_email_verified')

    # Fields to search by in the admin panel
    search_fields = ('username', 'first_name', 'last_name', 'email')

    # Allowing the admin to edit these fields directly from the list view
    list_editable = ('role', 'is_email_verified')

    # Optional: Fieldsets to organize the form in the admin panel
    fieldsets = (
        (None, {
            'fields': ('username', 'first_name', 'last_name', 'email')
        }),
        ('Personal Info', {
            'fields': ('middle_name', 'gender')
        }),
        ('Permissions', {
            'fields': ('role', 'is_email_verified')
        }),
        ('Confirmation', {
            'fields': ('confirmation_code',)
        }),
    )


# Register the CustomUser model with the custom admin interface
admin.site.register(CustomUser, CustomUserAdmin)
