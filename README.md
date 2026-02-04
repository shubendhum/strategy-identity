# Identity Strategy Website

A modern, enterprise-focused website presenting the Identity Strategy documentation with dynamic markdown rendering.

## Features

- Clean enterprise design with dark teal/grey/white color palette
- **Dynamic page rendering** - Add new markdown files without code changes
- Responsive layout for all screen sizes
- Local SVG diagrams and icons
- Docker support with Macquarie Artifactory

## Quick Start

### Option 1: Docker Compose (Artifactory)
```bash
# Login to Artifactory
docker login artifactory.devtools.syd.c1.macquarie.com:9956

# Build and run
docker-compose -f docker-compose.artifactory.yml build
docker-compose -f docker-compose.artifactory.yml up -d

# Access at http://localhost:3000
```

### Option 2: Docker Compose (Standard)
```bash
docker-compose up --build
# Access at http://localhost:3000
```

### Option 3: Local Development
```bash
cd frontend
yarn install
yarn start
# Access at http://localhost:3000
```

## Adding New Pages

### Step 1: Add your Markdown file
```bash
# Add to both locations
cp my-new-page.md frontend/src/content/
cp my-new-page.md frontend/public/content/
```

### Step 2: Register in config
Edit `frontend/src/config/pages.js`:
```javascript
{
  id: 'my-new-page',           // URL: /pages/my-new-page
  title: 'My Page Title',      // Header title
  description: 'Page description',
  icon: 'FileText',            // lucide-react icon
  file: 'my-new-page.md',      // Markdown filename
  navLabel: 'My Page',         // Navigation label
  order: 9,                    // Sort order
  showInNav: true,
}
```

### Available Icons
`Shield`, `AlertTriangle`, `RefreshCcw`, `Briefcase`, `FileText`, `TrendingDown`, `Target`, `CheckCircle2`

## Pages Included

| Page | URL | Description |
|------|-----|-------------|
| Overview | `/` | Main landing page |
| Executive Summary | `/pages/executive-summary` | High-level strategy overview |
| Why Change | `/pages/why-change` | Current challenges |
| What Is Changing | `/pages/what-is-changing` | Transformation approach |
| Security Posture | `/pages/security-posture` | Security benefits |
| Cost Reduction | `/pages/reduces-cost` | Cost reduction details |
| Business Experience | `/pages/business-experience` | Business benefits |
| Success Metrics | `/pages/success` | Success criteria |

## Project Structure

```
/app/
├── docker-compose.yml                 # Standard Docker Compose
├── docker-compose.artifactory.yml     # Artifactory Docker Compose
├── Dockerfile.frontend.artifactory    # Artifactory Dockerfile
├── ARTIFACTORY_BUILD.md               # Artifactory build guide
├── k8s/
│   ├── deployment.artifactory.yaml    # Kubernetes manifests
│   └── deploy-artifactory.sh          # K8s deployment script
└── frontend/
    ├── Dockerfile                     # Standard Dockerfile
    ├── nginx.conf                     # Nginx config for production
    ├── .npmrc                         # NPM registry config
    ├── .dockerignore
    ├── public/
    │   ├── assets/                    # SVG diagrams and icons
    │   └── content/                   # Markdown files (served)
    └── src/
        ├── config/
        │   └── pages.js               # ⭐ PAGE CONFIG - edit to add pages
        ├── content/                   # Markdown source files
        ├── components/
        └── pages/
```

## Kubernetes Deployment

```bash
# Using deployment script
chmod +x k8s/deploy-artifactory.sh
./k8s/deploy-artifactory.sh

# Or manually
kubectl create namespace identity-strategy
kubectl create secret docker-registry artifactory-secret \
  --docker-server=artifactory.devtools.syd.c1.macquarie.com:9956 \
  --docker-username=YOUR_USER \
  --docker-password=YOUR_PASS \
  -n identity-strategy
kubectl apply -f k8s/deployment.artifactory.yaml -n identity-strategy
```

## Artifactory Configuration

| Setting | Value |
|---------|-------|
| Docker Registry | `artifactory.devtools.syd.c1.macquarie.com:9956` |
| NPM Registry | `artifactory.devtools.syd.c1.macquarie.com:9996/npm-virtual` |
| Base Image | `node:18-alpine` |
| Production Image | `nginx:alpine` |

## Design System

- **Primary Color**: Dark Teal `hsl(180, 45%, 22%)`
- **Typography**: IBM Plex Sans / IBM Plex Mono
- **Components**: Shadcn/UI with custom styling

## Markdown Features

- Headings (H1, H2, H3) with proper styling
- Bullet lists with checkmark icons
- **Bold text** highlighting
- `Inline code` and code blocks
- Blockquotes
- Horizontal rules

## Documentation

- `README.md` - This file
- `ARTIFACTORY_BUILD.md` - Detailed Artifactory build guide
- `frontend/src/config/pages.js` - Page configuration reference
