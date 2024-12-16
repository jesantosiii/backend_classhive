from django.contrib import admin
from .models import Quiz, Question, Answer, StudentResponse, QuizAttempt


# Admin configuration for Quiz
class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'classroom', 'created_by', 'start_date', 'end_date', 'is_active')
    list_filter = ('classroom', 'created_by', 'is_active', 'start_date', 'end_date')
    search_fields = ('name', 'classroom__class_name', 'created_by__username')
    ordering = ('-start_date',)


# Admin configuration for Question
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'content', 'quiz', 'question_type', 'points')
    list_filter = ('quiz', 'question_type')
    search_fields = ('content', 'quiz__name')
    ordering = ('quiz',)


# Inline configuration for Answers in Question admin
class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 1  # Allow adding one answer initially in the admin interface


# Customizing Question admin to include Answer inline
class QuestionWithAnswerAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]
    list_display = ('id', 'content', 'quiz', 'question_type', 'points')
    list_filter = ('quiz', 'question_type')
    search_fields = ('content', 'quiz__name')


# Admin configuration for Answer
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'question', 'is_correct')
    list_filter = ('question__quiz', 'is_correct')
    search_fields = ('text', 'question__content', 'question__quiz__name')


# Admin configuration for StudentResponse
class StudentResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'quiz', 'question', 'selected_option', 'is_correct')
    list_filter = ('quiz', 'student', 'is_correct')
    search_fields = ('student__username', 'quiz__name', 'question__content')


# Admin configuration for QuizAttempt
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'quiz', 'status', 'score', 'total_score', 'start_time', 'end_time')
    list_filter = ('quiz', 'student', 'status', 'start_time', 'end_time')
    search_fields = ('student__username', 'quiz__name')


# Register models to admin site
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionWithAnswerAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(StudentResponse, StudentResponseAdmin)
admin.site.register(QuizAttempt, QuizAttemptAdmin)