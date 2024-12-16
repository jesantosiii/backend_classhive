# Generated by Django 5.1.3 on 2024-12-16 10:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('teachers', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_type', models.CharField(choices=[('MC', 'Multiple Choice'), ('ID', 'Identification'), ('TF', 'True or False')], max_length=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('content', models.TextField()),
                ('correct_answer', models.TextField(blank=True, null=True)),
                ('points', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('is_correct', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='quizzes.question')),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('timer_duration', models.IntegerField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='teachers.classroom')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='quizzes.quiz'),
        ),
        migrations.CreateModel(
            name='QuizAttempt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateField(auto_now_add=True)),
                ('end_time', models.DateField(blank=True, null=True)),
                ('status', models.CharField(choices=[('IP', 'In Progress'), ('CO', 'Completed'), ('TO', 'Timed Out')], default='IP', max_length=2)),
                ('score', models.IntegerField(default=0)),
                ('total_score', models.IntegerField(default=0)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attempts', to='quizzes.quiz')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_response', models.TextField(blank=True, null=True)),
                ('is_correct', models.BooleanField(default=False)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quizzes.question')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quizzes.quiz')),
                ('selected_option', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='quizzes.answer')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
