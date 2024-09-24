# Stage 1: Setup del backend Express
FROM node:18-alpine as build-backend

WORKDIR /app

# Copia i file package.json e installa le dipendenze del backend
COPY ./Backend/package*.json ./Backend/
RUN cd ./Backend && npm install --force

# Copia il codice sorgente del backend
COPY ./Backend ./Backend

# Installa TypeScript globalmente
RUN npm install -g typescript

# Compila il codice TypeScript in JavaScript
RUN cd ./Backend && tsc

# Copia il frontend (già costruito) nella cartella pubblica del backend
COPY ./Frontend/dist /app/Backend/public

# Espone la porta 3000 per l'app Express
EXPOSE 3000

# Comando per avviare il server Express
CMD ["node", "./Backend/index.js"]
