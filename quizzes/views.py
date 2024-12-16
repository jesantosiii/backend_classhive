from django.utils import timezone
from rest_framework import status, generics
from rest_framework.decorators import api_view

from rest_framework.generics import ListAPIView, RetrieveAPIView

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from students.models import StudentClasses
from teachers.models import Classroom

from .models import Quiz, StudentResponse, QuizAttempt, Question, Answer

from .serializers import QuizSerializer, StudentResponseSerializer, QuestionSerializer, AnswerSerializer, \
    QuizListSerializer, QuizAttemptSerializer


# Quiz creation (POST request)
@api_view(['POST'])
def create_quiz(request):
    classroom_id = request.data.get('classroom', None)
    if not classroom_id:
        return Response({"detail": "Classroom ID is required to assign the quiz."}, status=status.HTTP_400_BAD_REQUEST)

    classroom = get_object_or_404(Classroom, pk=classroom_id)

    # Create the quiz first
    quiz_serializer = QuizSerializer(data=request.data)
    if quiz_serializer.is_valid():
        quiz = quiz_serializer.save()

        # Automatically assign the quiz to the specified classroom
        classroom.quizzes.add(quiz)

        # Return the response with the quiz data
        return Response(quiz_serializer.data, status=status.HTTP_201_CREATED)

    return Response(quiz_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Submit student answers (POST request)
@api_view(['POST'])
def submit_answers(request, quiz_id):
    quiz = get_object_or_404(Quiz, pk=quiz_id)
    student = request.user  # Assuming the current user is the student

    # Proceed with submitting the quiz answers
    quiz_attempt = QuizAttempt.objects.filter(student=student, quiz=quiz).first()
    if not quiz_attempt:
        quiz_attempt = QuizAttempt.objects.create(student=student, quiz=quiz)

    # Get the answers from the request data
    responses = request.data.get('responses', [])

    # Create or update student responses
    for response_data in responses:
        question_id = response_data.get('question')
        selected_option = response_data.get('selected_option', None)
        text_response = response_data.get('text_response', None)

        student_response, created = StudentResponse.objects.update_or_create(
            student=student,
            quiz=quiz,
            question_id=question_id,
            defaults={'selected_option_id': selected_option, 'text_response': text_response}
        )

        # Evaluate the correctness of the response (if applicable)
        student_response.evaluate_correctness()

    # Check if all questions are answered before marking the quiz as completed
    unanswered_questions = quiz.questions.exclude(id__in=[r.question.id for r in StudentResponse.objects.filter(quiz=quiz, student=student)])
    if unanswered_questions.exists():
        return Response({"detail": "Please answer all the questions before submitting."}, status=status.HTTP_400_BAD_REQUEST)

    # Calculate the score and mark the quiz as completed
    quiz_attempt.calculate_score()  # Calculate the score
    quiz_attempt.status = QuizAttempt.Status.COMPLETED
    quiz_attempt.end_time = timezone.now()
    quiz_attempt.save()

    return Response({
        "detail": "Answers submitted successfully.",
        "score": quiz_attempt.score,
        "total_score": quiz_attempt.total_score
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def student_quiz_list(request):
    # Ensure the student is authenticated
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication is required."}, status=status.HTTP_401_UNAUTHORIZED)

    student = request.user  # The current logged-in student

    # Get the classrooms that the student is enrolled in
    student_classes = StudentClasses.objects.filter(student=student)

    # Check if the student is enrolled in any classroom, return 403 if not
    if not student_classes.exists():
        return Response(
            {"detail": "You are not enrolled in any classroom."},
            status=status.HTTP_403_FORBIDDEN,
        )

    # Get quizzes for the classrooms the student is enrolled in
    quizzes = Quiz.objects.filter(classroom__in=student_classes.values('classroom'))

    # Serialize the quizzes
    serializer = QuizListSerializer(quizzes, many=True)

    return Response(serializer.data)


# Retrieve student responses (GET request)
@api_view(['GET'])
def get_student_responses(request):
    student = request.user  # Get the current student
    quiz_id = request.query_params.get('quiz', None)
    if quiz_id:
        responses = StudentResponse.objects.filter(student=student, quiz_id=quiz_id)
    else:
        responses = StudentResponse.objects.filter(student=student)

    serializer = StudentResponseSerializer(responses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_quiz_scores(request, classroom_id, quiz_id):
    # Get the classroom and quiz
    classroom = get_object_or_404(Classroom, pk=classroom_id)
    quiz = get_object_or_404(Quiz, pk=quiz_id)

    # Ensure the quiz is assigned to the provided classroom
    if quiz.classroom != classroom:
        return Response({"detail": "Quiz is not assigned to this classroom."}, status=status.HTTP_400_BAD_REQUEST)

    # Get all quiz attempts for the given quiz in the classroom
    quiz_attempts = QuizAttempt.objects.filter(quiz=quiz)

    # Serialize the quiz attempts (student, score, total score, time spent)
    serializer = QuizAttemptSerializer(quiz_attempts, many=True)

    return Response(serializer.data)


class TeacherQuestionBankView(ListAPIView):
    """
    API view to fetch all questions created by the authenticated teacher.
    """
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filter questions to only include those created by the authenticated teacher.
        """
        user = self.request.user
        return Question.objects.filter(quiz__created_by=user)



class QuizDetailSerializer:
    pass



class TeacherQuizListView(ListAPIView):
    """
    API view to fetch all quizzes created by the authenticated teacher.
    """
    serializer_class = QuizListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filter quizzes to only include those created by the authenticated teacher.
        """
        user = self.request.user
        return Quiz.objects.filter(created_by=user)


class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = 'pk'  # Using 'pk' to fetch quiz by ID

class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']  # Extract quiz ID from URL
        return Question.objects.filter(quiz_id=quiz_id)

class AnswerListView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        question_id = self.kwargs['question_id']  # Extract question ID from URL
        return Answer.objects.filter(question_id=question_id)

