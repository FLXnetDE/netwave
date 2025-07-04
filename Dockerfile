# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first to install dependencies
COPY package*.json ./

# Install dependencies (include dev dependencies for TypeScript)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Environment
EXPOSE 5000/udp

# Start the app
CMD ["node", "dist/index.js"]
