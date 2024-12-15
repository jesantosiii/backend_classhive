
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('quizzes/', include('quizzes.urls')),
    path('students/', include('students.urls')),
    path('teachers/', include('teachers.urls')),
]
