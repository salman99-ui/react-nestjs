# 1. Build stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
