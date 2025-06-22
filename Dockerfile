# Use official Node.js Alpine image as the base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your app’s source code
COPY . .

# Expose the port your app runs on (change if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
