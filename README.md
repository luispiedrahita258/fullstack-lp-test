# fullstack-lp-test
fullstack-lp-test
Proyecto FullStack para gestionar pagos y productos, implementando una arquitectura robusta para la simulación de transacciones de productos.

Descripción
Esta es una aplicación FullStack diseñada para mostrar productos disponibles en una tienda y gestionar pagos mediante tarjeta de crédito. Implementa un frontend desarrollado en ReactJS que interactúa con un backend creado en Node.js. La API backend gestiona transacciones, pagos, productos, clientes y actualiza el stock de productos de forma automática.

El propósito de esta aplicación es simular un entorno de pagos y transacciones en tiempo real, permitiendo la integración de API y garantizando la interacción fluida entre frontend y backend.

Tecnologías usadas
Frontend:

ReactJS
Redux para el manejo de estado
Axios para las peticiones HTTP
CSS Grid y Flexbox para diseño responsive
Backend:

Node.js con AWS Lambda para funciones serverless
API Gateway de AWS para gestionar las peticiones HTTP
DynamoDB como base de datos NoSQL
Axios para realizar peticiones a la API externa de pagos
Despliegue en la nube:

Frontend desplegado en Amazon S3
Backend desplegado en AWS Lambda con API Gateway
Uso de AWS CloudFront para distribuir contenido con HTTPS
Requisitos previos
Node.js v14 o superior
AWS CLI configurado
Cuenta de AWS con permisos para usar S3, Lambda y API Gateway
Instalación
Backend
Clonar el repositorio:

bash
Copy code
git clone https://github.com/usuario/fullstack-lp-test.git
cd fullstack-lp-test/backend
Instalar las dependencias:

bash
Copy code
npm install
Configurar las variables de entorno en el archivo .env:

env
Copy code
PAYMENT_API_KEY=tu-api-key-de-pagos
Ejecutar el backend localmente:

bash
Copy code
npm start
Desplegar la API en AWS Lambda:

Subir el código del backend a AWS Lambda.
Configurar API Gateway para que funcione como interfaz para las solicitudes HTTP.
Frontend
Clonar el repositorio:

bash
Copy code
git clone https://github.com/usuario/fullstack-lp-test.git
cd fullstack-lp-test/frontend
Instalar las dependencias:

bash
Copy code
npm install
Configurar las variables de entorno en el archivo .env:

env
Copy code
REACT_APP_API_URL=https://tu-api-gateway-url
Crear el build de producción:

bash
Copy code
npm run build
Desplegar el frontend en S3:

Subir los archivos del build a un bucket S3.
Configurar S3 para servir los archivos como un sitio web estático.
Uso
Visitar la URL del frontend (https://fullstack-lp-test-bucket.s3.us-east-2.amazonaws.com/build/index.html).
Seleccionar un producto disponible para la compra.
Procesar el pago a través del formulario de tarjeta de crédito.
El backend procesará el pago utilizando la API de pagos y actualizará el estado de la transacción.
Una vez que la transacción sea completada, el frontend mostrará el estado final de la compra y el stock actualizado.
Pruebas
Pruebas en el frontend
Para ejecutar pruebas unitarias en el frontend:

bash
Copy code
cd frontend
npm run test
Pruebas en el backend
Para ejecutar pruebas unitarias en el backend:

bash
Copy code
cd backend
npm run test
Despliegue
Desplegar el frontend en S3:
Crear un bucket S3 para el frontend.
Subir el contenido del build al bucket.
Configurar el bucket de S3 para que actúe como un sitio web estático.
Desplegar el backend en AWS Lambda:
Subir la función Lambda del backend desde la carpeta backend.
Configurar API Gateway para manejar las solicitudes HTTP y conectarse con la función Lambda.
Configurar CloudFront:
Crear una distribución CloudFront apuntando al bucket de S3.
Configurar HTTPS y asegurarse de que todas las conexiones se realicen de manera segura.
Modelos de Datos
Productos
json
Copy code
{
  "id": "string",
  "nombre": "string",
  "precio": "number",
  "stock": "number"
}
Transacciones
json
Copy code
{
  "id": "string",
  "estado": "string",
  "monto": "number",
  "producto_id": "string",
  "cliente_id": "string",
  "fecha_transaccion": "date"
}
Clientes
json
Copy code
{
  "id": "string",
  "nombre": "string",
  "direccion_entrega": "string",
  "correo_electronico": "string"
}
Seguridad
HTTPS está configurado mediante CloudFront para asegurar la conexión.
Las peticiones API están restringidas a CORS para mayor seguridad.
El bucket de S3 está configurado para evitar el acceso público no autorizado.
Seguimiento de las mejores prácticas de seguridad, siguiendo alineamientos OWASP.
Contacto
Para cualquier duda o sugerencia, puedes contactar a través del repositorio de GitHub o enviar un correo electrónico.


