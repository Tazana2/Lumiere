from django.http import StreamingHttpResponse, JsonResponse
import cv2
import numpy as np
import os
from django.core.cache import cache

# Variable global para almacenar la captura de video
cap = None

# Vista para obtener la predicción actual
def get_prediction(request):
    prediction = cache.get('current_prediction', None)
    print(prediction)
    if prediction is not None:
        return JsonResponse({'prediction': int(prediction)})
    else:
        return JsonResponse({'prediction': 'No prediction available'})

# Vista para detener el acceso a la cámara
def stop_camera(request):
    global cap
    if cap is not None:
        cap.release()  # Libera el acceso a la cámara
        cap = None  # Limpia la variable global
        return JsonResponse({'status': 'Camera stopped successfully'})
    else:
        return JsonResponse({'status': 'No active camera to stop'}, status=400)

# Vista para el feed de video
def video_feed(request):
    global cap  # Usa la variable global para almacenar la captura de video
    import mediapipe as mp
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense

    # Inicialización de MediaPipe y carga del modelo
    mp_holistic = mp.solutions.holistic
    mp_drawing = mp.solutions.drawing_utils
    actions = np.array(['hola', 'mi_nombre_es', 'como_estas','chao','buenas_noches', 'INSOR', 'por_favor', 'parado'])

    # Cargar el modelo
    def load_model():
        model = Sequential()
        model.add(LSTM(64, return_sequences=True, activation="relu", input_shape=(30, 1662)))
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
    # ROSTRO
        if results.face_landmarks:
            mp_drawing.draw_landmarks(
                image, # Se pasa el frame
                results.face_landmarks, # Se verifica si hay resultados correspondientes a la cara.
                mp_holistic.FACEMESH_TESSELATION, # Se pasan los nodos.
                mp_drawing.DrawingSpec(color=(209, 12, 163), thickness=1, circle_radius=1), # Nodos
                mp_drawing.DrawingSpec(color=(0, 0, 0), thickness=1, circle_radius=1) # Líneas
            )
    #POSE (BRAZOS, PECHO) 
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                image,
                results.pose_landmarks,
                mp_holistic.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(209,12,163), thickness=2, circle_radius=4),
                mp_drawing.DrawingSpec(color=(0,0,0), thickness=2, circle_radius=2)
            )
    # MANO IZQUIERDA
        if results.left_hand_landmarks:
            mp_drawing.draw_landmarks(
                image,
                results.left_hand_landmarks,
                mp_holistic.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(209,12,163), thickness=2, circle_radius=4),
                mp_drawing.DrawingSpec(color=(0,0,0), thickness=2, circle_radius=2)
            )
    # MANO DERECHA
        if results.right_hand_landmarks:
            mp_drawing.draw_landmarks(
                image,
                results.right_hand_landmarks,
                mp_holistic.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(209,12,163), thickness=2, circle_radius=4),
                mp_drawing.DrawingSpec(color=(0,0,0), thickness=2, circle_radius=2)
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
            cv2.putText(output_frame, f'{actions[idx]}: {prob:.2f}', (5, 85 + idx*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
        return output_frame

    # Colores para cada acción
    colors = [(245, 117, 16), (117, 245, 16), (16, 117, 245), (16, 245, 117), (117, 16, 245), (245, 16, 117), (245, 16, 117), (16, 245, 117)]

    def gen_frames():
        global cap
        if cap is None:  # Solo abre la cámara si no está abierta
            cap = cv2.VideoCapture(0)
        
        sequence = []
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

                    image = prob_viz(res, actions, image, colors)

                ret, buffer = cv2.imencode('.jpg', image)
                frame = buffer.tobytes()

                yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        cap.release()
        cap = None  # Limpiar la variable global cuando se deje de usar
    return StreamingHttpResponse(gen_frames(), content_type='multipart/x-mixed-replace; boundary=frame')