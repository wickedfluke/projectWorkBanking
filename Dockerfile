# Stage 1: Build del frontend Angular
FROM node:18-alpine as build-frontend

WORKDIR /app

# Copia i file del frontend e installa le dipendenze
COPY ./Frontend/package*.json ./Frontend/
RUN cd ./Frontend && npm install --force

# Costruisci il frontend Angular
COPY ./Frontend ./Frontend
RUN cd ./Frontend && npm run build --prod

# Stage 2: Setup del backend Express
FROM node:18-alpine as build-backend

WORKDIR /app

# Copia i file del backend e installa le dipendenze
COPY ./Backend/package*.json ./Backend/
RUN cd ./Backend && npm install --force

# Copia i file di build del frontend nella cartella "public" del backend
COPY --from=build-frontend /app/Frontend/dist /app/Backend/public

# Copia il resto del codice del backend
COPY ./Backend ./Backend

# Espone la porta 3000 per l'app Express
EXPOSE 3000

# Avvia il server Express
CMD ["node", "./Backend/server.js"]
