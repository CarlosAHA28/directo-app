
# Directo App

Este proyecto es una aplicación desarrollada en **NestJS** que utiliza **RabbitMQ** para la comunicación entre servicios. Se incluyen dos servicios: `API` y `Calculator`.

## Requisitos previos

Antes de ejecutar esta aplicación, asegúrate de tener instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Configuración inicial

### Clona el repositorio

```bash
git clone https://github.com/CarlosAHA28/directo-app.git
cd directo-app

## Ejecución

### Iniciar la aplicación

npm i

Para iniciar la aplicación, ejecuta el siguiente comando:

docker-compose up --build -d

### Detener la aplicación
docker-compose down


### Validación
Accede a RabbitMQ Management en tu navegador:

URL: http://localhost:15672
Usuario: guest
Contraseña: guest
Realiza una prueba en el servicio api utilizando Postman o tu navegador:

Endpoint: http://localhost:3000/calculate?n=<numero>
Ejemplo: http://localhost:3000/calculate?n=10

Respuesta esperada (en caso de éxito):

{
    "data": <resultado>,
    "message": "Cálculo realizado con éxito."
}

Respuesta esperada (en caso de error):

{
    "error": "El número debe ser un entero positivo."
}

{
    "error": "Número inválido. Proporcione un entero positivo."
}

Logs de los servicios
Para visualizar los logs de los servicios en tiempo real, utiliza:

docker logs -f api

docker logs -f calculator

docker logs -f rabbitmq
