from django.urls import path
from . import views

urlpatterns = [
    # View for joining a class
    path('join/', views.JoinClassView.as_view(), name='join_class'),

    # View for leaving a class
    path('leave/', views.LeaveClassView.as_view(), name='leave_class'),

    # View for listing all the classes a student is enrolled in (with assigned quizzes)
    path('classes/', views.StudentClassesListView.as_view(), name='student_classes'),
]
