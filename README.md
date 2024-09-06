# Instrucciones para Iniciar Lumiere

Este proyecto incluye un frontend y un backend. A continuación, se proporcionan los pasos para instalar las dependencias necesarias y ejecutar el proyecto correctamente.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:
- **Python** (versión 3.8.19)
- **pip** (gestor de paquetes de Python)
- **Node.js** (versión 14 o superior)
- **npm** (gestor de paquetes de Node.js)

## Instalación de Dependencias

### 1. Clonar el repositorio

Primero, clona el repositorio de tu proyecto o navega a la carpeta de tu proyecto localmente.

```bash
git clone https://github.com/Tazana2/Lumiere.git
cd Lumiere
```
### 2. Instalar los requirements

Una vez dentro de la carpeta del proyecto, debes instalar los requirements.


```bash
pip install -r .\requirements.txt charset-normalizer==3.1.0 --force-reinstall --user
```

### 3. Iniciar el servidor de React y Django

Primero, debes abrir dos terminales para el frontend y backend. Ahora, en la primera terminal debes moverte a la carpeta fronend, instalar los paquetes de node e iniciar el servidor de React.

```bash
cd frontend
npm install
npm run dev
```

Luego, en la segunda terminal, navega a la carpeta backend para iniciar el servidor de Django.

```bash 
cd backend
python manage.py runserver
