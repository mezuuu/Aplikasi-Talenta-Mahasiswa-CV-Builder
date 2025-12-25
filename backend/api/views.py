from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import StudentProfile, Skill, Experience
from .serializers import StudentProfileSerializer, SkillSerializer, ExperienceSerializer

<<<<<<< HEAD

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_current_user(request):
    """Return current user info including role (is_staff)"""
=======
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_info(request):
    """Get current user info including role (is_staff)"""
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_current_user(request):
    """Get current user info for admin dashboard - endpoint /api/users/me/"""
>>>>>>> ed137fdf8ac58e2f8406a1928aa11bd0af1376da
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
    })

class StudentViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['full_name', 'prodi', 'skills__name']

    def get_queryset(self):
        # Admin gets all students
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return StudentProfile.objects.all()
        # Public only gets active students
        return StudentProfile.objects.filter(is_active=True)

    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        try:
            profile = request.user.profile
        except StudentProfile.DoesNotExist:
            return Response({"detail": "Profil belum dibuat."}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        
        elif request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def toggle_active(self, request, pk=None):
<<<<<<< HEAD
        """Toggle the is_active status of a student profile (Admin only)"""
        student = self.get_object()
        student.is_active = not student.is_active
        student.save()
        return Response({
            'id': student.id,
            'full_name': student.full_name,
            'is_active': student.is_active,
            'message': f"Profil {'diaktifkan' if student.is_active else 'dinonaktifkan'}"
=======
        """Toggle student active status (admin only)"""
        student = self.get_object()
        # Toggle is_active field - default to True if not set
        current_status = getattr(student, 'is_active', True)
        student.is_active = not current_status
        student.save()
        return Response({
            'id': student.id,
            'is_active': student.is_active
>>>>>>> ed137fdf8ac58e2f8406a1928aa11bd0af1376da
        })

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(student__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user.profile)

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(student__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user.profile)