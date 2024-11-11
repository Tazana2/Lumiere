from math import ceil
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated  # AllowAny solo para testing, si es necesario
from openai import OpenAI
import json
from django.http import JsonResponse
from django.views import View
from django.conf import settings
from . import models
from . import serializers

# Módulo
class ModuleList(generics.ListAPIView):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    permission_classes = [IsAuthenticated]

class ModuleDetail(generics.RetrieveAPIView):
    serializer_class = serializers.ModuleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs.get("pk")
        return models.Module.objects.filter(id=module_id)

# Lecciones
class LessonsByModuleList(generics.ListAPIView):
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs.get("module_id")
        return models.Lesson.objects.filter(module_id=module_id)

class LessonDetail(generics.RetrieveAPIView):
    serializer_class = serializers.LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        lesson_id = self.kwargs.get("pk")
        return models.Lesson.objects.filter(id=lesson_id)

# Progreso del usuario
class UserProgressList(generics.ListAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return models.UserProgress.objects.filter(user=user)

class UpdateUserProgressView(generics.UpdateAPIView):
    serializer_class = serializers.UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        lesson_id = self.kwargs.get("lesson_id")

        try:
            lesson = models.Lesson.objects.get(id=lesson_id)
        except models.Lesson.DoesNotExist:
            return None

        # Obtener o crear el progreso de la lección del usuario
        user_progress, created = models.UserProgress.objects.get_or_create(user=user, lesson=lesson)
        return user_progress

    def update(self, request, *args, **kwargs):
        user_progress = self.get_object()

        if user_progress is None:
            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)

        completed = request.data.get('completed', False)  # El usuario solo envía si completó o no la lección
        user_progress.is_completed = completed
        user_progress.save()

        return Response({"completed": user_progress.is_completed}, status=status.HTTP_200_OK)

class ModuleProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, module_id):
        user = request.user
        try:
            module = models.Module.objects.get(id=module_id)
        except models.Module.DoesNotExist:
            return Response({"error": "Module not found"}, status=status.HTTP_404_NOT_FOUND)

        total_lessons = models.Lesson.objects.filter(module=module).count()
        completed_lessons = models.UserProgress.objects.filter(user=user, lesson__module=module, is_completed=True).count()

        if total_lessons == 0:
            return Response({"progress_percentage": 0}, status=status.HTTP_200_OK)
        else:
            progress_percentage = ceil((completed_lessons / total_lessons) * 100)
            return Response({"progress_percentage": progress_percentage}, status=status.HTTP_200_OK)
    

class GenerateInteractiveLessonView(View):
    def get(self, request):
        # Configura la solicitud a OpenAI
        if request.session.get('lesson_fetched'):
            return JsonResponse({"error": "La lección ya fue generada en esta sesión."}, status=429)
        
        client = OpenAI(api_key="")

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": "Crearás una historia de la vida diaria o de situaciones cotidianas, enlazando esto con diferentes ejercicios, suministrando un JSON como  usando tu creatividad para situar los ejercicios con esos formatos y crear historias interactivas. Para que puedas crear esto mejor te dejo la siguiente información.\r\n\r\nEl JSON empezará con el título de la historia \"title\", \"description\" su descripción y \"participants\" en \"participants podrá utilizar ids del 1 hasta el 6 y podrá poner hasta 6 participantes: Ejemplo:\r\n\r\n\"title\": \"Conversación en una cafetería\",\r\n\"description\": \"Simulación de una conversación entre tres personas en una cafetería para practicar saludos y presentaciones.\",\r\n\"participants\": [\r\n    { \"id\": \"1\", \"name\": \"Ana\" },\r\n    { \"id\": \"4\", \"name\": \"Luis\" },\r\n    { \"id\": \"3\", \"name\": \"Marta\" } \r\n    #Puedes poner el número de participantes que quieras con otros nombres\r\n],\r\n\r\nLuego de ello tendremos \"content\" que será la historia interactiva que crearás, todo dentro de []. Por ejemplo podrás añadir una parte de \"type\": \"dialogue\" que será un texto dicho por unos personajes.\r\n\"content\": [\r\n    {\r\n      \"type\": \"dialogue\",\r\n      \"id\": \"dialogue_1\",\r\n      \"speakerId\": \"1\",\r\n      \"text\": \"¡Hola Pedro! ¿Cómo estás hoy?\"\r\n    },\r\n\r\nA partir de esto puedes empeza a crear ejercicios para que el usuario interactúe en medio de los diálogos, ya sea diciendo como se hace una seña, o haciendo las señas correspondientes al contexto. Puedes crear ejercicios con \"type\":\"multiple_choice\" que pueden tener \"description\", \"instructions\", \"option_type\" que sirve si las opciones serán imágenes poniendo como valor \"images\", \"question\" y \"options\" En el caso de que option_type sea \"images\" las \"options\" serán rutas que están en signs/nombre.png. Las imagenes que se encuentran disponibles son signs/adios.png, signs/amor.png, signs/banar.png, signs/cumpleanos.png, signs/de_nada.png, signs/felicitar.png, signs/fumar.png, signs/hola.png, signs/hoy.png, signs/idea.png, signs/insor.png, signs/lo_siento.png . y \"correct_option\" en el que se pondrá la opción correcta. En caso de que las opciones son texto, entonces añade una imagen en el enunciado con agregando el parámetro \"image\":\"signs/nombre.png\" utilizando las imagenes disponibles que ya te mencioné o en caso de que quieras un video entonces pondrás \"video\": /nombre.mp4 y en nombre podrás escoger entre abuelo.mp4, adios.mp4, bien.mp4, buenas_noches.mp4, como_estas.mp4, feliz_dia.mp4, hermano.mp4, hija.mp4, hola.mp4. ES MUY IMPORTANTE QUE SOLO USES COMO OPCIONES LAS IMAGENES Y VIDEOS QUE TE DIJE QUE ESTÁN DISPONIBLES, TEN EN CUENTA ANTES DE GENERAR EL JSON.\r\n\r\n    Ejemplo de \"option_type\":\"images\"\r\n    {\r\n      \"type\": \"multiple_choice\",\r\n      \"title\": \"Selecciona la respuesta correcta\",\r\n      \"description\": \"\",\r\n      \"instructions\": \"\",\r\n      \"option_type\" : \"images\", #En caso de que quieras usar imagenes como opciones\r\n      \"question\": \"¿Qué seña debería utilizar Ana para saludar a Luis?\\n\\n\",\r\n      \"options\": [\r\n          \"/signs/amor.png\",\r\n          \"/signs/hola.png\",\r\n          \"/signs/adios.png\",\r\n          \"/signs/por_favor.png\"\r\n      ],\r\n      \"correct_option\": \"/signs/hola.png\",\r\n      \"feedback\": {\r\n          \"correct\": \"¡Correcto! Sigamos\",\r\n          \"incorrect\": \"Respuesta incorrecta. Intenta de nuevo.\",\r\n          \"completed\": \"Has completado la pregunta.\"\r\n      }\r\n    }\r\n\r\n    Ejemplo de \"video\", cuando quieres usar videos en los enunciados\r\n    {\r\n    \"id\": 5,\r\n    \"type\": \"multiple_choice\",\r\n    \"title\": \"Selecciona la seña correcta\",\r\n    \"description\": \"Mira la siguiente seña y selecciona a lo que corresponde\",\r\n    \"instructions\": \"\",\r\n    \"video\": \"/hola.mp4\", # Puedes escoger entre abuelo.mp4, adios.mp4, bien.mp4, buenas_noches.mp4, como_estas.mp4, feliz_dia.mp4, hermano.mp4, hija.mp4, hola.mp4\r\n    \"question\": \"\",\r\n    \"options\": [\r\n        \"Hola\",\r\n        \"Enojado\",\r\n        \"Adiós\",\r\n        \"Gracias\"\r\n    ],\r\n    \"correct_option\": \"Hola\",\r\n    \"max_attempts\": 2,\r\n    \"feedback\": {\r\n        \"correct\": \"¡Correcto! Sigamos\",\r\n        \"incorrect\": \"Respuesta incorrecta. Intenta de nuevo.\",\r\n        \"completed\": \"Has completado la pregunta.\"\r\n        }\r\n    }\r\n\r\n    Ejemplo de \"image\", cuando quieres usar imagenes en los enunciados\r\n    {\r\n      \"type\": \"multiple_choice\",\r\n      \"title\": \"Selección de la señal correcta\",\r\n      \"description\": \"Observa la imagen y elige la señal mostrada\",\r\n      \"instructions\": \"Selecciona la opción correcta\",\r\n      \"question\": \"¿Qué señal representa esta imagen?\\n\\n\",\r\n      \"image\": \"/signs/amor.png\", # Puedes escoger entre signs/adios.png, signs/amor.png, signs/banar.png, signs/cumpleanos.png, signs/de_nada.png, signs/felicitar.png, signs/fumar.png, signs/hola.png, signs/hoy.png, signs/idea.png, signs/insor.png, signs/lo_siento.png\r\n      \"options\": [\r\n        \"amor\",\r\n        \"triste\",\r\n        \"salud\",\r\n        \"hola\"\r\n      ],\r\n      \"correct_option\": \"amor\",\r\n      \"feedback\": {\r\n        \"correct\": \"¡Correcto! Continuemos.\",\r\n        \"incorrect\": \"Respuesta incorrecta. Inténtalo de nuevo.\",\r\n        \"completed\": \"Has completado la pregunta.\"\r\n      }\r\n    }\r\n\r\nLos ejercicios de \"type\": \"sign_detection\" tendrán \"title\",\"description\",\"instructions\", \"sign_to_detect\" que deberá ser igual a 0,1,2 que corresponden a las señas hola, mi_nombre_es, como_estas, respectivamente. ES IMPORTANTE QUE SOLO USES ESAS y que tengan sentido con la historia.\r\n\r\n    {\r\n      \"type\": \"sign_detection\",\r\n      \"title\": \"Realiza la seña correcta\",\r\n      \"description\": \"Inténtalo! Realiza la seña cómo estás: como_estas.jpg \", #Solo puedes pedir hola, mi nombre es, y como estas\r\n      \"instructions\": \"\",\r\n      \"sign_to_detect\": 2, # 0(hola),1(mi_nombre_es),2(como_estas) \r\n      \"correct\": \"¡Bien hecho! Has realizado la seña de 'como_estas' correctamente.\"\r\n    }\r\n \r\nLos ejercicios \"find_the_pair\" siguen la misma lógica que los anteriores y PUEDES AGREGAR ENTRE 2 y 5 PAIRS en el parámetro \"pairs\" con su palabra y emoji (imagen) en /signs/nombre.png\" respectivamente TEN ENCUENTA SOLO LOS QUE TE DIJE QUE ESTÁN DISPONIBLES: {\"word\": \"adios\", \"emoji\": \"/signs/adios.png\"},{\"word\": \"amor\", \"emoji\": \"/signs/amor.png\"},{\"word\": \"banar\", \"emoji\": \"/signs/banar.png\"},{\"word\": \"cumpleanos\", \"emoji\": \"/signs/cumpleanos.png\"},{\"word\": \"de_nada\", \"emoji\": \"/signs/de_nada.png\"},{\"word\": \"felicitar\", \"emoji\": \"/signs/felicitar.png\"},{\"word\": \"fumar\", \"emoji\": \"/signs/fumar.png\"},{\"word\": \"hola\", \"emoji\": \"/signs/hola.png\"},{\"word\": \"hoy\", \"emoji\": \"/signs/hoy.png\"},{\"word\": \"idea\", \"emoji\": \"/signs/idea.png\"},{\"word\": \"insor\", \"emoji\": \"/signs/insor.png\"},{\"word\": \"lo_siento\", \"emoji\": \"/signs/lo_siento.png\"},{\"word\": \"por_favor\", \"emoji\": \"/signs/por_favor.png\"}\r\n\r\n    {\r\n      \"type\": \"find_the_pair\",\r\n      \"title\": \"Encuentra las parejas\",\r\n      \"description\": \"Empareja las emociones con los emojis correctos.\",\r\n      \"instructions\": \"Selecciona una palabra y luego el emoji que la representa. Si son correctos, se emparejarán.\",\r\n      \"pairs\": [\r\n          {\r\n              \"word\": \"INSOR\",\r\n              \"emoji\": \"/signs/insor.png\"\r\n          },\r\n          {\r\n              \"word\": \"HOLA\",\r\n              \"emoji\": \"/signs/hola.png\"\r\n          }\r\n      ],\r\n      \"max_attempts\": 3,\r\n      \"feedback\": {\r\n          \"correct\": \"¡Bien hecho! Has emparejado correctamente.\",\r\n          \"incorrect\": \"Inténtalo de nuevo.\",\r\n          \"completed\": \"¡Has encontrado todas las parejas!\"\r\n      }\r\n    }\r\n\r\nRecuerda que puedes añadir al JSON tantos dialogos y ejercicios de todos los tipos como quieras siempre con sentido y con las estructuras dadas. Tómate tu tiempo para crear un JSON en el que los ejercicios tengan sentido con la conversación. No crees ejercicios que no tengan que ver con el tema en el que está la conversación. Genera una conversación que TENGA más de 8 diálogos entre 5 y 7 ejercicios de cualquier tipo\r\nComo respuesta solo entrega el JSON."
                    }
                ]
                }
            ],
            temperature=1.11,
            max_tokens=4095,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            response_format={
                "type": "json_object"
            }
        )


        # Convierte el contenido de la respuesta a JSON
        #print("a punto de generar json")
        content = completion.choices[0].message.content
        #print(content)
        try:
            json_content = json.loads(content)
            request.session['lesson_fetched'] = True
            return JsonResponse(json_content)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": f"Error al decodificar JSON: {e}"}, status=500)

        