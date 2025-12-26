# ---------- STAGE 1: deps / builder ----------
FROM node:20-alpine AS builder

WORKDIR /app/backend

# Copiamos solo dependencias primero (mejor caché)
COPY package*.json ./

# Instala TODO (dev + prod) — por si hay build
RUN npm install

# Copiamos el resto del código
COPY . .

# ---------- STAGE 2: development ----------
FROM node:20-alpine AS dev

WORKDIR /app/backend

ENV NODE_ENV=development

# Copiamos node_modules y código desde builder
COPY --from=builder /app/backend /app/backend

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ---------- STAGE 3: production ----------
FROM node:20-alpine AS prod

WORKDIR /app/backend
ENV NODE_ENV=production

# copiamos solo lo necesario
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/src ./src
# Si compilas a dist, cambia a:
# COPY --from=builder /app/backend/dist ./dist

EXPOSE 3000

# En producción normalmente no se usa "dev"
CMD ["npm", "run", "start"]