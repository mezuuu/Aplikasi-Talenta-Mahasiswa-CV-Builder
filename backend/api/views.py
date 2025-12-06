from rest_framework import viewsets, filters
from .models import StudentProfile, Skill
from .serializers import StudentProfileSerializer, SkillSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['full_name', 'prodi', 'skills__name'] # Fitur search
    
    # Otomatis handle: GET list, GET detail, POST (create), PUT (update)