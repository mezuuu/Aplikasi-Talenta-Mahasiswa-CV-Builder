from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
from .views import StudentViewSet, SkillViewSet, ExperienceViewSet, get_current_user
=======
from .views import StudentViewSet, get_user_info, get_current_user
from .views import SkillViewSet
from .views import ExperienceViewSet
>>>>>>> ed137fdf8ac58e2f8406a1928aa11bd0af1376da

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'skills', SkillViewSet, basename='skill') 
router.register(r'experiences', ExperienceViewSet, basename='experience') 

urlpatterns = [
    path('user-info/', get_user_info, name='user-info'),
    path('users/me/', get_current_user, name='current-user'),
    path('', include(router.urls)),
    path('users/me/', get_current_user, name='current-user'),
]