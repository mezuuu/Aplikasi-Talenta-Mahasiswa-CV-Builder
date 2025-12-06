from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet
from .views import SkillViewSet
from .views import ExperienceViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'skills', SkillViewSet, basename='skill') 
router.register(r'experiences', ExperienceViewSet, basename='experience') 

urlpatterns = [
    path('', include(router.urls)),
]