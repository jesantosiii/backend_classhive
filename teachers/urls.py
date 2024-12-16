# teachers/urls.py
from django.urls import path
from . import views
from .views import ClassroomPeopleView

urlpatterns = [
    # Classroom management (Teacher actions)
    path('classrooms/', views.ClassroomListCreateView.as_view(), name='classroom_list_create'),
    path('classrooms/<int:pk>/', views.ClassroomDetailView.as_view(), name='classroom_detail'),
    path('classrooms/<str:class_code>/people/', ClassroomPeopleView.as_view(), name='classroom-people'),
]
