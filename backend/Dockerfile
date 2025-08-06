FROM node:20-alpine

WORKDIR /app

# Copiar archivos para instalar dependencias
COPY package*.json ./

RUN npm ci --production

# Copiar resto del código
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
