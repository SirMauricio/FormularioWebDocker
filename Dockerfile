# Etapa 1: build del frontend
FROM node:20-alpine AS builder

WORKDIR /app

COPY .env .env
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # genera carpeta dist con los archivos estáticos

# Etapa 2: servidor nginx para producción
FROM nginx:alpine

# Copia la build estática a la carpeta de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración nginx personalizada (opcional)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 2330

CMD ["nginx", "-g", "daemon off;"]
