# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar .env y archivos fuente
COPY .env .env
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copiar build estático generado en etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx (ajusta ruta si usas otra)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
