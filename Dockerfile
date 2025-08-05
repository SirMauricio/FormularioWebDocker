# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY .env .
COPY . .
RUN npm install
RUN npm run build

# Etapa para NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
