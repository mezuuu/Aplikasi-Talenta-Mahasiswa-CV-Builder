from django.db import models
from django.contrib.auth.models import User

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    nim = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    prodi = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    linkedin_link = models.URLField(blank=True)

    def __str__(self):
        return self.full_name

class Skill(models.Model):
    student = models.ForeignKey(StudentProfile, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    level = models.CharField(max_length=20, choices=[('Beginner','Beginner'), ('Intermediate','Intermediate'), ('Expert','Expert')])

    def __str__(self):
        return f"{self.name} - {self.student.full_name}"