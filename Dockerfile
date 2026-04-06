FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy project files and build TS
COPY . .
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Push DB schema and start server
CMD npx prisma db push && npm run start
