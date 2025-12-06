from rest_framework import serializers
from .models import StudentProfile, Skill
from django.contrib.auth.models import User

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level']

class StudentProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True) # Nested serializer
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = StudentProfile
        fields = ['id', 'nim', 'full_name', 'email', 'prodi', 'bio', 'photo', 'linkedin_link', 'skills']