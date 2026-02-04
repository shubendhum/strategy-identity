# Build stage
FROM artifactory.devtools.syd.c1.macquarie.com:9956/node:18-alpine AS builder

WORKDIR /app

# Disable SSL certificate verification for self-signed certificates
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Configure npm/yarn to use Macquarie artifactory npm-virtual
# Disable strict SSL for self-signed certificate chain
RUN npm config set registry https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-virtual && \
    npm config set strict-ssl false && \
    yarn config set strict-ssl false && \
    yarn config set "strict-ssl" false -g

# Copy package files (exclude yarn.lock to avoid version conflicts with proxy)
COPY package.json ./

# Install dependencies using yarn (without frozen lockfile for registry compatibility)
RUN yarn install --network-timeout 600000

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
    npm config set strict-ssl false && \
    npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "build", "-l", "3000"]
