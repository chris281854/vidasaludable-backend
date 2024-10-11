
# Usa la imagen de Node.js como base
FROM node:18 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Usa una imagen de Node.js ligera para el runtime
FROM node:18-slim

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=build /app/.next .next
COPY --from=build /app/public public
COPY --from=build /app/package*.json ./

# Instala las dependencias de producción
RUN npm install --only=production

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]