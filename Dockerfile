# FROM node:23-alpine3.20

# WORKDIR /app

# COPY package.json .

# COPY package-lock.json .

# RUN npm install --legacy-peer-deps

# COPY . .

# EXPOSE 3000

# CMD ["sh", "-c", "npx prisma db push && npx prisma generate && npm run dev"]
# Base image
FROM node:23-alpine3.20 AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build Prisma and Next.js app
RUN npx prisma generate && npm run build

# ----------------------------------------------

# Final production image
FROM node:23-alpine3.20 AS final

WORKDIR /app

# Copy only necessary files from build
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma

# Expose app port
EXPOSE 3000

# Set environment variables (if needed)
ENV NODE_ENV=production

# Run DB migration only once (optional), then start server
CMD ["sh", "-c", "npx prisma db push && npm start"]
