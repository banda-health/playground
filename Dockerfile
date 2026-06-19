# Multi-stage Dockerfile for React app
# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config template — envsubst runs at container start via the
# nginx image's built-in entrypoint, substituting $API_PORT before nginx starts
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose port (will be overridden by docker-compose)
EXPOSE 80

# Stage 3: Development image
FROM node:20-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 for Vite dev server
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]