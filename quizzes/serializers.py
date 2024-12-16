from rest_framework import serializers
from .models import Quiz, Question, Answer, QuizAttempt, StudentResponse


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question_type', 'content','description', 'answers']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'timer_duration', 'created_by', 'classroom',
                  'is_active', 'questions']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            answers_data = question_data.pop('answers', [])
            question = Question.objects.create(quiz=quiz, **question_data)

            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)

        return quiz


class QuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'name', 'description', 'classroom']

class StudentResponseSerializer(serializers.ModelSerializer):
    selected_option = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all(), required=False)  # Assuming we have the option to select answers
    text_response = serializers.CharField(allow_blank=True, required=False)

    student = serializers.StringRelatedField()  # Assuming CustomUser model has __str__ method
    quiz = QuizSerializer()  # Nested Quiz Serializer
    question = QuestionSerializer()  # Nested Question Serializer

    class Meta:
        model = StudentResponse
        fields = ['id', 'student', 'quiz', 'question', 'selected_option', 'text_response', 'submitted_at']

    def to_representation(self, instance):
        # You can dynamically evaluate whether the response is correct
        representation = super().to_representation(instance)
        representation['is_correct'] = instance.is_correct
        return representation

class QuizAttemptSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()  # Assumes CustomUser model has __str__ method
    quiz = QuizSerializer()  # Nested Quiz Serializer
    status_display = serializers.CharField(source='get_status_display', read_only=True)  # Show human-readable status

    class Meta:
        model = QuizAttempt
        fields = ['id', 'student', 'quiz', 'start_time', 'end_time', 'status', 'status_display']
