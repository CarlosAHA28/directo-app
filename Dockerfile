# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia todo el código fuente
COPY . .

# Compila el código
RUN npm run build

# Comando de inicio (este se sobrescribe en docker-compose.yml)
CMD ["node", "dist/apps/api/main.js"]
