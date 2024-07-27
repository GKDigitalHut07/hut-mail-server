# Stage 1: Build Angular App
FROM --platform=linux/amd64 node:20-alpine as build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ["package*.json", "./"]

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy all other files to the working directory
COPY . .

# Build the Angular Universal application
RUN npm run build:ssr

# Stage 2: Serve the application with Nginx and Node.js
FROM --platform=linux/amd64 nginx:1.23.2-alpine as serve

# Install Node.js
RUN apk add --no-cache nodejs-current npm

# Set working directory
WORKDIR /usr/src/app

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built browser bundle
COPY --from=build /usr/src/app/dist/gkdigitalhut/browser /usr/share/nginx/html

# Copy the server bundle
COPY --from=build /usr/src/app/dist/gkdigitalhut/server /usr/src/app/dist/gkdigitalhut/server

# Expose the port the app runs on
EXPOSE 4201

# Start the SSR server with Node.js and Nginx
CMD ["sh", "-c", "node /usr/src/app/dist/gkdigitalhut/server/main.js & nginx -g 'daemon off;'"]
