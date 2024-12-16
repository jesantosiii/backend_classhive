from django.db import models
from django.utils.translation import gettext_lazy as _

from accounts.models import CustomUser
from teachers.models import Classroom


class Quiz(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name="quizzes")
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    timer_duration = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    MULTIPLE_CHOICE = 'MC'
    IDENTIFICATION = 'ID'
    TRUE_FALSE = 'TF'
    QUESTION_TYPES = [
        (MULTIPLE_CHOICE, 'Multiple Choice'),
        (IDENTIFICATION, 'Identification'),
        (TRUE_FALSE, 'True or False')
    ]

    question_type = models.CharField(max_length=10, choices=QUESTION_TYPES)
    instruction = models.TextField(null=True, blank=True)
    content = models.TextField()  # The content of the question (the prompt)
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    correct_answer = models.TextField(null=True, blank=True)  # Correct answer for identification questions
    points = models.IntegerField(default=1)  # Points assigned to this question

    def __str__(self):
        return self.content


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.TextField()  # The option text for multiple choice or True/False
    is_correct = models.BooleanField(default=False)  # Mark if it's the correct answer

    def save(self, *args, **kwargs):
        # Ensure True/False questions only have two answers
        if self.question.question_type == Question.TRUE_FALSE:
            if Answer.objects.filter(question=self.question).count() >= 2:
                raise ValueError("True/False questions should only have two possible answers.")
        super().save(*args, **kwargs)


class StudentResponse(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Answer, null=True, blank=True, on_delete=models.SET_NULL)
    text_response = models.TextField(null=True, blank=True)  # Used for identification questions
    is_correct = models.BooleanField(default=False)

    def evaluate_correctness(self):
        if self.question.question_type == Question.MULTIPLE_CHOICE:
            if self.selected_option and self.selected_option.is_correct:
                self.is_correct = True
            else:
                self.is_correct = False
        elif self.question.question_type == Question.IDENTIFICATION:
            # Trim whitespace and check case-insensitive match
            if self.text_response and self.text_response.strip().lower() == self.question.correct_answer.strip().lower():
                self.is_correct = True
            else:
                self.is_correct = False
        elif self.question.question_type == Question.TRUE_FALSE:
            if self.selected_option and self.selected_option.is_correct:
                self.is_correct = True
            else:
                self.is_correct = False
        self.save()

    def get_score(self):
        return self.question.points if self.is_correct else 0


class QuizAttempt(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS = 'IP', _('In Progress')
        COMPLETED = 'CO', _('Completed')
        TIMED_OUT = 'TO', _('Timed Out')

    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.IN_PROGRESS)
    score = models.IntegerField(default=0)  # Track the score of the student
    total_score = models.IntegerField(default=0)  # Track the total score

    @property
    def time_spent(self):
        if self.end_time:
            return (self.end_time - self.start_time).total_seconds() / 60  # Time in minutes
        return 0

    def calculate_score(self):
        student_responses = StudentResponse.objects.filter(quiz=self.quiz, student=self.student)
        self.score = sum(response.get_score() for response in student_responses)
        self.total_score = sum(question.points for question in self.quiz.questions.all())
        self.save()

    def __str__(self):
        return f"{self.student.username} - {self.quiz.name} Attempt ({self.get_status_display()})"

