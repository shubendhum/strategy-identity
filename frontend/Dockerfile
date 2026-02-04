# Build stage
FROM artifactory.devtools.syd.c1.macquarie.com:9956/node:18-alpine AS builder

WORKDIR /app

# Configure npm to use Macquarie artifactory
RUN npm config set registry https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-virtual

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Copy markdown content to public folder for dynamic loading
RUN mkdir -p public/content && cp src/content/*.md public/content/

# Build the application
RUN yarn build

# Production stage
FROM artifactory.devtools.syd.c1.macquarie.com:9956/node:18-alpine AS production

WORKDIR /app

# Install serve to run the static files
RUN npm config set registry https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-virtual && \
    npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "build", "-l", "3000"]
