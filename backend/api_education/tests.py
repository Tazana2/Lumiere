from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Module, Lesson
from .serializers import ModuleSerializer, LessonSerializer

# initialize the APIClient app
client = APIClient()

class GetAllModulesTest(TestCase):
    """ Test module list API """

    def setUp(self):
        Module.objects.create(
            title='Module 1', description='This is module 1')
        Module.objects.create(
            title='Module 2', description='This is module 2')
        Module.objects.create(
            title='Module 3', description='This is module 3')
        Module.objects.create(
            title='Module 4', description='This is module 4')

    def test_get_all_modules(self):
        # get API response
        response = client.get(reverse('module_list'))
        # get data from db
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GetSingleModuleTest(TestCase):
    """ Test module detail API """

    def setUp(self):
        self.module1 = Module.objects.create(
            title='Module 1', description='This is module 1')
        self.module2 = Module.objects.create(
            title='Module 2', description='This is module 2')
        self.module3 = Module.objects.create(
            title='Module 3', description='This is module 3')
        self.module4 = Module.objects.create(
            title='Module 4', description='This is module 4')

    def test_get_valid_single_module(self):
        response = client.get(
            reverse('module_detail', kwargs={'pk': self.module1.pk}))
        module = Module.objects.get(pk=self.module1.pk)
        serializer = ModuleSerializer(module)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_module(self):
        response = client.get(
            reverse('module_detail', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class GetAllLessonsByModuleTest(TestCase):
    """ Test lessons by module list API """

    def setUp(self):
        self.module1 = Module.objects.create(
            title='Module 1', description='This is module 1')
        self.module2 = Module.objects.create(
            title='Module 2', description='This is module 2')
        self.module3 = Module.objects.create(
            title='Module 3', description='This is module 3')
        self.module4 = Module.objects.create(
            title='Module 4', description='This is module 4')
        Lesson.objects.create(
            title='Lesson 1', content='This is lesson 1', module=self.module1)
        Lesson.objects.create(
            title='Lesson 2', content='This is lesson 2', module=self.module1)
        Lesson.objects.create(
            title='Lesson 3', content='This is lesson 3', module=self.module2)
        Lesson.objects.create(
            title='Lesson 4', content='This is lesson 4', module=self.module2)

    def test_get_all_lessons_by_module(self):
        response = client.get(
            reverse('lessons_by_module_list', kwargs={'module_id': self.module1.pk}))
        lessons = Lesson.objects.filter(module=self.module1)
        serializer = LessonSerializer(lessons, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)