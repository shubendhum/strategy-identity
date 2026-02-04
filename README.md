# Identity Strategy Website

A modern, enterprise-focused website presenting the Identity Strategy documentation with dynamic markdown rendering.

## Quick Start (Pre-built Approach)

Since Artifactory `npm-virtual` doesn't have all public npm packages, use the pre-built approach:

### Step 1: Build locally (one-time, on machine with npm access)
```bash
cd frontend
yarn install
yarn build
cp -r public/content build/   # Copy markdown files
cd ..
```

### Step 2: Build Docker image (only needs nginx from Artifactory)
```bash
docker login artifactory.devtools.syd.c1.macquarie.com:9956
docker-compose -f docker-compose.prebuilt.yml build
```

### Step 3: Run
```bash
docker-compose -f docker-compose.prebuilt.yml up -d
```

### Step 4: Access
Open http://localhost:3000

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
  title: 'My Page Title',
  description: 'Page description',
  icon: 'FileText',            // lucide-react icon
  file: 'my-new-page.md',
  navLabel: 'My Page',
  order: 9,
  showInNav: true,
}
```

### Step 3: Rebuild
```bash
cd frontend
yarn build
cp -r public/content build/
cd ..
docker-compose -f docker-compose.prebuilt.yml build --no-cache
docker-compose -f docker-compose.prebuilt.yml up -d
```

## Available Icons
`Shield`, `AlertTriangle`, `RefreshCcw`, `Briefcase`, `FileText`, `TrendingDown`, `Target`, `CheckCircle2`

## Pages Included

| Page | URL |
|------|-----|
| Overview | `/` |
| Executive Summary | `/pages/executive-summary` |
| Why Change | `/pages/why-change` |
| What Is Changing | `/pages/what-is-changing` |
| Security Posture | `/pages/security-posture` |
| Cost Reduction | `/pages/reduces-cost` |
| Business Experience | `/pages/business-experience` |
| Success Metrics | `/pages/success` |

## Project Structure

```
/app/
├── Dockerfile.prebuilt              # Pre-built Dockerfile (recommended)
├── docker-compose.prebuilt.yml      # Pre-built compose (recommended)
├── k8s/
│   ├── deployment.artifactory.yaml
│   └── deploy-artifactory.sh
└── frontend/
    ├── build/                       # Pre-built static files
    │   ├── content/                 # Markdown files
    │   └── static/                  # JS/CSS
    ├── nginx.conf
    ├── src/
    │   ├── config/pages.js          # Page configuration
    │   └── content/                 # Markdown source
    └── public/
        ├── assets/                  # SVG icons
        └── content/                 # Markdown files
```

## Kubernetes Deployment

```bash
chmod +x k8s/deploy-artifactory.sh
./k8s/deploy-artifactory.sh
```

## Artifactory Configuration

| Setting | Value |
|---------|-------|
| Docker Registry | `artifactory.devtools.syd.c1.macquarie.com:9956` |
| Base Image | `nginx:alpine` |
| Container Port | 80 |
| Host Port | 3000 |

## Design System

- **Primary Color**: Dark Teal `hsl(180, 45%, 22%)`
- **Typography**: IBM Plex Sans
- **Components**: Shadcn/UI with Radix primitives
