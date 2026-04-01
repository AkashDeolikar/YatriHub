# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install Prisma dependencies
RUN apk add --no-cache openssl bash libc6-compat

COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN npx prisma generate
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies for Prisma
RUN apk add --no-cache openssl bash libc6-compat

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]
