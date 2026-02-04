# Artifactory Docker Build - Quick Reference

## ✅ Build Configuration

The Docker build is configured to use Macquarie Artifactory for both base images and npm packages.

## 🎯 Key Configuration

### Build Context
```yaml
# docker-compose.artifactory.yml
identity-strategy-web:
  build:
    context: ./frontend              # ← Build context is frontend directory
    dockerfile: ../Dockerfile.frontend.artifactory  # ← Dockerfile at root
```

This ensures Docker can find:
- `package.json`
- `nginx.conf`
- `src/` directory
- `public/` directory

## 🚀 Quick Start

### 1. Login to Artifactory
```bash
docker login artifactory.devtools.syd.c1.macquarie.com:9956
# Enter username and password when prompted
```

### 2. Build with Docker Compose
```bash
# Build the service
docker-compose -f docker-compose.artifactory.yml build

# Or build without cache
docker-compose -f docker-compose.artifactory.yml build --no-cache
```

### 3. Run Service
```bash
docker-compose -f docker-compose.artifactory.yml up -d
```

### 4. Access Website
Open: http://localhost:3000

## 🔧 Manual Build Commands

### From Root Directory
```bash
# Build frontend (from /app directory)
cd frontend
docker build \
  -f ../Dockerfile.frontend.artifactory \
  -t artifactory.devtools.syd.c1.macquarie.com:9956/identity-strategy:latest \
  .
cd ..
```

## 📦 Push to Artifactory

```bash
docker push artifactory.devtools.syd.c1.macquarie.com:9956/identity-strategy:latest
```

## ☸️ Kubernetes Deployment

### Using Deploy Script (Recommended)
```bash
chmod +x k8s/deploy-artifactory.sh
./k8s/deploy-artifactory.sh
```

The script will:
1. Create namespace `identity-strategy`
2. Prompt for Artifactory credentials
3. Create image pull secrets
4. Deploy the website

### Manual Deployment
```bash
# Create namespace
kubectl create namespace identity-strategy

# Create Artifactory secret
kubectl create secret docker-registry artifactory-secret \
  --docker-server=artifactory.devtools.syd.c1.macquarie.com:9956 \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  --docker-email=YOUR_EMAIL \
  -n identity-strategy

# Deploy
kubectl apply -f k8s/deployment.artifactory.yaml -n identity-strategy
```

### Check Deployment Status
```bash
# Check pods
kubectl get pods -n identity-strategy

# Check services
kubectl get svc -n identity-strategy

# View logs
kubectl logs -f deployment/identity-strategy -n identity-strategy
```

### Port Forward for Testing
```bash
kubectl port-forward service/identity-strategy 3000:80 -n identity-strategy
```

## 🔍 Verification

### Check File Structure
```bash
# Frontend files (from root)
ls -la frontend/package.json
ls -la frontend/nginx.conf
ls -la frontend/src/
ls -la frontend/public/
```

### Test Build (without cache)
```bash
cd frontend
docker build --no-cache -f ../Dockerfile.frontend.artifactory -t test-identity .
cd ..
```

## 🐛 Troubleshooting

### Error: "failed to compute cache key"
**Solution**: Verify build context is `./frontend`
```bash
ls -la ./frontend/package.json
ls -la ./frontend/nginx.conf
```

### Error: "COPY failed: no source files"
**Solution**: Ensure you're in the correct directory
- Build context is `./frontend`
- Dockerfile copies from current directory (frontend)

### Error: "unauthorized: authentication required"
**Solution**: Login to Artifactory
```bash
docker login artifactory.devtools.syd.c1.macquarie.com:9956
```

### Error: npm packages not found (404)
**Solution**: Try different npm repository
```bash
# In Dockerfile, change to npm-proxy or npm-all:
RUN npm config set registry https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-proxy
```

### Error: K8s pods in ImagePullBackOff
**Solution**: Verify image pull secret
```bash
# Check secret exists
kubectl get secret artifactory-secret -n identity-strategy

# Recreate if needed
kubectl delete secret artifactory-secret -n identity-strategy
kubectl create secret docker-registry artifactory-secret \
  --docker-server=artifactory.devtools.syd.c1.macquarie.com:9956 \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  --docker-email=YOUR_EMAIL \
  -n identity-strategy
```

## 📋 File Reference

### Artifactory Build Files
```
/app/
├── Dockerfile.frontend.artifactory    # Artifactory-specific Dockerfile
├── docker-compose.artifactory.yml     # Docker Compose for Artifactory
├── docker-compose.yml                 # Standard Docker Compose (public npm)
├── frontend/
│   ├── Dockerfile                     # Standard Dockerfile
│   ├── .npmrc                         # NPM registry config
│   ├── .dockerignore                  # Docker ignore file
│   ├── nginx.conf                     # Nginx configuration
│   └── ...
└── k8s/
    ├── deployment.artifactory.yaml    # Kubernetes manifests
    └── deploy-artifactory.sh          # Deployment script
```

## 🎯 Build Context Explained

**Build Context** is the directory Docker uses as the base for COPY commands.

```dockerfile
# Context: ./frontend (set in docker-compose.artifactory.yml)
COPY package.json ./
# Copies from: /app/frontend/package.json
# To: /app/package.json (in container)

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copies from: /app/frontend/nginx.conf
# To: /etc/nginx/conf.d/default.conf (in container)
```

## ✨ Configuration Summary

| Setting | Value |
|---------|-------|
| Base Image | `artifactory...com:9956/node:18-alpine` |
| Nginx Image | `artifactory...com:9956/nginx:alpine` |
| NPM Registry | `artifactory...com:9996/npm-releases` |
| Build Context | `./frontend` |
| Dockerfile | `../Dockerfile.frontend.artifactory` |
| Container Port | 80 |
| Host Port | 3000 |

## 🎓 Adding New Pages

After deployment, to add new markdown pages:

1. Add `.md` file to `frontend/src/content/`
2. Add `.md` file to `frontend/public/content/`
3. Register in `frontend/src/config/pages.js`
4. Rebuild and redeploy:
   ```bash
   docker-compose -f docker-compose.artifactory.yml build --no-cache
   docker-compose -f docker-compose.artifactory.yml up -d
   ```
