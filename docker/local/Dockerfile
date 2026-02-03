# Local Development Dockerfile
# This image is optimized for fast local development with Next.js hot reload

# Use a lightweight Node.js base image
FROM node:24-alpine

# Enable Corepack to use npm for package management
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
# This way, "npm install" only reruns when dependencies change
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Default command to start Next.js in development mode (hot reload enabled)
ENTRYPOINT [ "sh", "/app/docker/local/entrypoint.sh" ]
