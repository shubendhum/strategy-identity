.PHONY: up down restart logs build clean push

# Default target
help:
	@echo "Identity Strategy Website - Make Commands"
	@echo ""
	@echo "  make up       - Start the website on http://localhost:3003"
	@echo "  make down     - Stop the website"
	@echo "  make restart  - Restart the website"
	@echo "  make logs     - View container logs"
	@echo "  make build    - Build the Docker image"
	@echo "  make clean    - Stop and remove containers/images"
	@echo "  make push     - Push image to Artifactory"
	@echo ""

# Start the website
up:
	@echo "Starting Identity Strategy website on http://localhost:3003..."
	docker-compose -f docker-compose.artifactory.yml up -d
	@echo ""
	@echo "✓ Website running at: http://localhost:3003"

# Stop the website
down:
	@echo "Stopping Identity Strategy website..."
	docker-compose -f docker-compose.artifactory.yml down

# Restart
restart:
	@echo "Restarting Identity Strategy website..."
	docker-compose -f docker-compose.artifactory.yml restart

# View logs
logs:
	docker-compose -f docker-compose.artifactory.yml logs -f

# Build the image
build:
	@echo "Building Identity Strategy Docker image..."
	docker-compose -f docker-compose.artifactory.yml build --no-cache

# Build and start
up-build:
	@echo "Building and starting Identity Strategy website..."
	docker-compose -f docker-compose.artifactory.yml up -d --build
	@echo ""
	@echo "✓ Website running at: http://localhost:3003"

# Clean up
clean:
	@echo "Cleaning up..."
	docker-compose -f docker-compose.artifactory.yml down --rmi local -v

# Push to Artifactory
push:
	@echo "Pushing image to Artifactory..."
	docker push artifactory.devtools.syd.c1.macquarie.com:9956/identity-strategy:latest
