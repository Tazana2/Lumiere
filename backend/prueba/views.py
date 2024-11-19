# prueba/views.py

from django.http import StreamingHttpResponse
from django.shortcuts import render
import cv2
import numpy as np
import os
import mediapipe as mp
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense


# Inicialización de MediaPipe
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

# Definir acciones
actions = np.array(['hola', 'mi_nombre_es', 'como_estas','chao','buenas_noches', 'INSOR', 'por_favor', 'parado'])

# Cargar el modelo
def load_model():
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, activation="relu", input_shape=(30,1662)))
    model.add(LSTM(128, return_sequences=True, activation="relu"))
    model.add(LSTM(64, return_sequences=False, activation="relu"))
    model.add(Dense(64, activation="relu"))
    model.add(Dense(32, activation="relu"))
    model.add(Dense(actions.shape[0], activation="softmax"))
    model.compile(optimizer="Adam", loss="categorical_crossentropy", metrics=["categorical_accuracy"])

    # Cargar los pesos desde el archivo action.h5 en la misma carpeta que views.py
    weights_path = os.path.join(os.path.dirname(__file__), 'tryfewer.h5')
    model.load_weights(weights_path)

    return model

model = load_model()

# Función para detección con MediaPipe
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Conversión de color
    image.flags.writeable = False                  # Imagen no editable
    results = model.process(image)                 # Predicción
    image.flags.writeable = True                   # Imagen editable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # Conversión de color
    return image, results

# Función para dibujar landmarks
def draw_landmarks(image, results):
    # Rostro
    if results.face_landmarks:
        mp_drawing.draw_landmarks(
            image,
            results.face_landmarks,
            mp_holistic.FACEMESH_TESSELATION,
            mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1),
            mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1)
        )
    # Postura
    if results.pose_landmarks:
        mp_drawing.draw_landmarks(
            image,
            results.pose_landmarks,
            mp_holistic.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(80,22,10), thickness=2, circle_radius=4),
            mp_drawing.DrawingSpec(color=(80,44,121), thickness=2, circle_radius=2)
        )
    # Mano izquierda
    if results.left_hand_landmarks:
        mp_drawing.draw_landmarks(
            image,
            results.left_hand_landmarks,
            mp_holistic.HAND_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4),
            mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
        )
    # Mano derecha
    if results.right_hand_landmarks:
        mp_drawing.draw_landmarks(
            image,
            results.right_hand_landmarks,
            mp_holistic.HAND_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4),
            mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
        )

# Función para extraer keypoints
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, face, lh, rh])

# Función para visualizar probabilidades
def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for idx, prob in enumerate(res):
        cv2.rectangle(output_frame, (0, 60 + idx*40), (int(prob*100), 90 + idx*40), colors[idx], -1)
        cv2.putText(output_frame, f'{actions[idx]}: {prob:.2f}', (5, 85 + idx*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
    return output_frame

# Colores para cada acción
colors = [(245, 117, 16), (117, 245, 16), (16, 117, 245), (16, 245, 117), (117, 16, 245), (245, 16, 117), (245, 16, 117), (16, 245, 117)]

from django.http import JsonResponse

# Variable global para almacenar la predicción actual
from django.core.cache import cache

def gen_frames():
    cap = cv2.VideoCapture(0)
    sequence = []
    sentence = []
    predictions = []
    threshold = 0.8

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            image, results = mediapipe_detection(frame, holistic)
            draw_landmarks(image, results)

            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            sequence = sequence[-30:]

            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                prediction = np.argmax(res)

                if res[prediction] > threshold:
                    # Almacena la predicción en el caché de Django
                    cache.set('current_prediction', prediction)
                    print(f'Current prediction: {prediction}')

                predictions.append(prediction)
                image = prob_viz(res, actions, image, colors)

            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

# Nueva vista para obtener la predicción actual
def get_prediction(request):
    prediction = cache.get('current_prediction', None)
    print(prediction)
    if prediction is not None:
        return JsonResponse({'prediction':  int(prediction)})
    else:
        return JsonResponse({'prediction': 'No prediction available'})

# Vista para el feed de video
def video_feed(request):
    return StreamingHttpResponse(gen_frames(), content_type='multipart/x-mixed-replace; boundary=frame')
