# fullstack-lp-test
Proyecto FullStack para gestionar pagos y productos, implementando una arquitectura robusta para la simulación de transacciones de productos.

Esta es una aplicación FullStack diseñada para mostrar productos disponibles en una tienda y gestionar pagos mediante tarjeta de crédito. Implementa un frontend desarrollado en ReactJS que conecta con un backend creado en Node.js. La API backend gestiona transacciones, pagos, productos, clientes y actualiza el stock de productos de forma automática.

El propósito de esta aplicación es simular un entorno de pagos y transacciones en tiempo real, permitiendo la integración de API y garantizando la interacción fluida entre frontend y backend.

Tecnologías usadas

Frontend:

-ReactJS
-Redux para el manejo de estado
-Axios para las peticiones HTTP
-CSS Grid y Flexbox para diseño responsive


Backend:

-Node.js con AWS Lambda para funciones serverless
-API Gateway de AWS para gestionar las peticiones HTTP
-Postgresql como base de datos NoSQL
-Axios para realizar peticiones a la API externa de pagos

Despliegue en la nube:

Desplegado en Amazon S3 con distribución CloudFront.

URL del frontend: https://fullstack-lp-test-bucket.s3.us-east-2.amazonaws.com/build/index.html

Backend desplegado en AWS Lambda con API Gateway
Uso de AWS CloudFront para distribuir contenido con HTTPS

Requisitos previos
Node.js v14 o superior
AWS CLI configurado
Cuenta de AWS con permisos para usar S3, Lambda y API Gateway

Instalación
Backend
Clonar el repositorio:

git clone https://github.com/luispiedrahita258/fullstack-lp-test.git
cd fullstack-lp-test


Configurar el entorno

Frontend:
Instalar dependencias:

cd frontend
npm install


Configurar las variables de entorno en un archivo .env:
REACT_APP_API_URL=https://tu-api-gateway-url

Compilar y desplegar:
npm run build

Ejecutar el backend localmente:

Backend:
Instalar dependencias:

Configurar las variables de entorno en el archivo .env:

Desplegar la API en AWS Lambda:
PAYMENT_API_KEY=tu-api-key

Base de datos
El proyecto utiliza PostgreSQL como base de datos relacional para almacenar productos y transacciones.

Tablas principales:
Productos: Almacena la información de los productos disponibles.
Transacciones: Registra cada transacción de pago.
Clientes: Información de los clientes que realizan la compra.

Pruebas
Frontend:
Para ejecutar las pruebas unitarias en el frontend, utiliza el siguiente comando:

npm run test

Backend:
Para ejecutar las pruebas unitarias en el backend:

npm run test

Documentación adicional
Postman Collection: Se encuentra disponible en el archivo postman_collection.json dentro del repositorio.
Capturas de pantalla: En la carpeta images se encuentran las evidencias visuales del funcionamiento de la aplicación.
Contribuciones
Para contribuir a este proyecto, por favor, sigue los pasos establecidos en el repositorio de GitHub y crea solicitudes de extracción con las mejoras que consideres.