# Identity Strategy Website

A modern, enterprise-focused website presenting the Identity Strategy documentation.

## Features

- Clean enterprise design with dark teal/grey/white color palette
- Responsive layout for all screen sizes
- Local SVG diagrams and icons
- Content pages matching provided markdown files
- Docker support for local development

## Pages

1. **Overview** (`/`) - Main landing page with strategy overview
2. **Why Change** (`/why-change`) - Explains the need for transformation
3. **What Is Changing** (`/what-is-changing`) - Details the transformation approach
4. **Security Posture** (`/security`) - Security benefits of the strategy
5. **Business Experience** (`/business`) - Business experience improvements

## Local Development

### Prerequisites

- Docker and Docker Compose installed
- Access to Macquarie artifactory (for npm packages and Docker images)

### Running with Docker

1. Build and start the container:

```bash
docker-compose up --build
```

2. Access the website at `http://localhost:3000`

### Running without Docker

If you have Node.js 18+ installed locally:

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Access the website at `http://localhost:3000`

## Project Structure

```
/app
├── docker-compose.yml          # Docker Compose configuration
├── frontend/
│   ├── Dockerfile              # Docker build configuration
│   ├── .npmrc                  # NPM registry configuration
│   ├── public/
│   │   └── assets/             # Local SVG diagrams and icons
│   │       ├── logo.svg
│   │       ├── hero-diagram.svg
│   │       ├── transformation-diagram.svg
│   │       ├── security-diagram.svg
│   │       ├── business-diagram.svg
│   │       └── icon-*.svg
│   └── src/
│       ├── components/         # React components
│       ├── content/            # Markdown content files
│       └── pages/              # Page components
```

## Content Files

The markdown content files are located in `/frontend/src/content/`:

- `index.md` - Overview content
- `why-change.md` - Why change documentation
- `what-is-changing.md` - What is changing documentation
- `security-posture.md` - Security posture documentation
- `business-experience.md` - Business experience documentation

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV` - Set to `production` for production builds
- `REACT_APP_BACKEND_URL` - Backend API URL (optional, for future API integration)

## Docker Configuration

The Dockerfile uses Macquarie artifactory for both the base image and npm packages:

- **Base Image**: `artifactory.devtools.syd.c1.macquarie.com:9956/node:18-alpine`
- **NPM Registry**: `https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-virtual`

## Design System

The website uses a custom design system with:

- **Primary Color**: Dark Teal (`hsl(180, 45%, 22%)`)
- **Background**: Light grey/white
- **Typography**: IBM Plex Sans (headings and body), IBM Plex Mono (code)
- **Components**: Shadcn/UI primitives with custom styling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
