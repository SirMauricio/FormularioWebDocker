# Etapa build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa producción
FROM nginx:alpine

# Copiar build estático al nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración nginx para usar puertos 8080 y 8443 (si tienes config personalizada)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponer puertos internos 8080 y 8443 (para que coincida con tu nginx)
EXPOSE 8080 8443

CMD ["nginx", "-g", "daemon off;"]
