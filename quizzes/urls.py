from django.urls import path
from . import views
from .views import TeacherQuestionBankView, TeacherQuizListView

urlpatterns = [
    # Quiz creation (POST request)
    path('api/quizzes/', views.create_quiz, name='create_quiz'),

    # Submit student answers (POST request)
    path('api/quizzes/<int:quiz_id>/submit-answers/', views.submit_answers, name='submit_answers'),

    # Retrieve student responses (GET request)
    path('api/student-responses/', views.get_student_responses, name='get_student_responses'),

    # Get student quiz list (GET request)
    path('api/student/quizzes/', views.student_quiz_list, name='student_quiz_list'),

    # Get quiz scores for a classroom and quiz (GET request)
    path('api/classrooms/<int:classroom_id>/quizzes/<int:quiz_id>/scores/', views.get_quiz_scores, name='get_quiz_scores'),

    path('question-bank/', TeacherQuestionBankView.as_view(), name='teacher-question-bank'),
    path('teacher/quizzes/', TeacherQuizListView.as_view(), name='teacher-quiz-list'),
]