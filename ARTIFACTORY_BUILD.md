# Artifactory Docker Build Fix

## Problem Summary
Docker build errors occurred when using Artifactory mirrors due to incorrect build contexts and file path references in Dockerfiles and docker-compose configurations.

### Error Messages:
- `failed to compute cache key`
- `failed to calculate checksum`
- Files not found: `nginx.conf`, `yarn.lock`, `package.json`

## Root Cause
The frontend Dockerfile was using the wrong build context:
- **Build context**: `.` (root directory `/app`)
- **Expected files**: `package.json`, `yarn.lock`, `nginx.conf`
- **Actual location**: `/app/frontend/`

## Solution Applied

### 1. Docker Compose Fix (`docker-compose.artifactory.yml`)
**Changed frontend build configuration:**
```yaml
# BEFORE:
frontend:
  build:
    context: .                              # Wrong: root directory
    dockerfile: Dockerfile.frontend.artifactory

# AFTER:
frontend:
  build:
    context: ./frontend                     # Correct: frontend directory
    dockerfile: ../Dockerfile.frontend.artifactory
```

### 2. Frontend Dockerfile (`Dockerfile.frontend.artifactory`)
Uses build context of `./frontend`, so COPY commands reference files directly:
```dockerfile
COPY package.json ./           # Copies from /app/frontend/package.json
COPY nginx.conf /etc/nginx/... # Copies from /app/frontend/nginx.conf
```

## File Structure
```
/app/
├── Dockerfile.frontend.artifactory         # Frontend Dockerfile (uses context: ./frontend)
├── docker-compose.artifactory.yml          # Compose file with correct contexts
├── docker-compose.yml                      # Standard compose (for local dev)
├── ARTIFACTORY_BUILD.md                    # This file
├── k8s/
│   ├── deployment.artifactory.yaml         # Kubernetes manifests
│   └── deploy-artifactory.sh               # K8s deployment script
└── frontend/
    ├── Dockerfile                          # Standard Dockerfile
    ├── package.json                        # Frontend dependencies
    ├── nginx.conf                          # Nginx configuration
    ├── .npmrc                              # NPM registry config
    ├── .dockerignore                       # Docker ignore file
    ├── public/
    │   ├── assets/                         # SVG diagrams and icons
    │   └── content/                        # Markdown files (served)
    └── src/
        ├── config/pages.js                 # Page configuration
        ├── content/                        # Markdown source files
        └── ...
```

## Build Instructions

### Using Docker Compose (Recommended)
```bash
# Login to Artifactory
docker login artifactory.devtools.syd.c1.macquarie.com:9956

# Build all services
docker-compose -f docker-compose.artifactory.yml build

# Build without cache (recommended for first build)
docker-compose -f docker-compose.artifactory.yml build --no-cache

# Build and start services
docker-compose -f docker-compose.artifactory.yml up -d
```

### Using Docker Directly
```bash
# Build context is frontend directory
cd frontend
docker build -f ../Dockerfile.frontend.artifactory -t identity-strategy:latest .
cd ..
```

### Building for Artifactory Registry
```bash
# Login to Artifactory
docker login artifactory.devtools.syd.c1.macquarie.com:9956

# Build and tag
cd frontend
docker build -f ../Dockerfile.frontend.artifactory \
  -t artifactory.devtools.syd.c1.macquarie.com:9956/identity-strategy:latest .
cd ..

# Push to Artifactory
docker push artifactory.devtools.syd.c1.macquarie.com:9956/identity-strategy:latest
```

## Kubernetes Deployment

### Prerequisites
1. Artifactory credentials configured
2. Kubectl configured with cluster access

### Deploy Script (Recommended)
```bash
# Run deployment script
chmod +x k8s/deploy-artifactory.sh
./k8s/deploy-artifactory.sh
```

### Manual Deployment
```bash
# Create namespace
kubectl create namespace identity-strategy

# Create Artifactory pull secret
kubectl create secret docker-registry artifactory-secret \
  --docker-server=artifactory.devtools.syd.c1.macquarie.com:9956 \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  --docker-email=YOUR_EMAIL \
  -n identity-strategy

# Deploy services
kubectl apply -f k8s/deployment.artifactory.yaml -n identity-strategy
```

### Check Deployment
```bash
# Check pods
kubectl get pods -n identity-strategy

# Check services
kubectl get svc -n identity-strategy

# View logs
kubectl logs -f deployment/identity-strategy -n identity-strategy

# Port forward for testing
kubectl port-forward service/identity-strategy 3000:80 -n identity-strategy
```

## Verification

### Check Build Context
```bash
# Test build
cd frontend
docker build -f ../Dockerfile.frontend.artifactory -t test-identity .
cd ..
```

### Verify File Paths
```bash
# Check if files exist in correct locations
ls -la frontend/package.json
ls -la frontend/nginx.conf
ls -la frontend/src/
ls -la frontend/public/
```

### Test Docker Compose
```bash
# Dry-run to check configuration
docker-compose -f docker-compose.artifactory.yml config

# Build without cache to verify all paths
docker-compose -f docker-compose.artifactory.yml build --no-cache
```

## Troubleshooting

### Issue: "failed to compute cache key"
**Cause**: File not found in build context
**Solution**: Verify build context matches file locations
```bash
# Check that context is ./frontend
cat docker-compose.artifactory.yml | grep -A5 "build:"
```

### Issue: "COPY failed: no source files"
**Cause**: File path doesn't exist relative to build context
**Solution**: Check that files are copied from correct paths

### Issue: nginx.conf not found
**Cause**: Frontend build context was root instead of frontend directory
**Solution**: Use `context: ./frontend` in docker-compose.yml

### Issue: Permission denied when building
**Cause**: User doesn't have access to Artifactory or files
**Solution**: 
```bash
# Login to Artifactory
docker login artifactory.devtools.syd.c1.macquarie.com:9956

# Check file permissions
ls -la frontend/
```

### Issue: npm packages not found (404)
**Cause**: Packages not in npm-releases repository
**Solution**: Try different npm repository
```bash
# In Dockerfile, try npm-proxy or npm-all:
RUN npm config set registry https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-proxy
```

### Issue: yarn.lock conflicts
**Cause**: yarn.lock has versions not available in Artifactory
**Solution**: 
- `.dockerignore` excludes `yarn.lock`
- Dockerfile uses `yarn install` without `--frozen-lockfile`

### Issue: K8s pods in ImagePullBackOff
**Cause**: Artifactory credentials not configured
**Solution**:
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

## Key Configuration Summary

| Setting | Value |
|---------|-------|
| Docker Registry | `artifactory.devtools.syd.c1.macquarie.com:9956` |
| NPM Registry | `artifactory.devtools.syd.c1.macquarie.com:9996/npm-releases` |
| Base Image | `node:18-alpine` |
| Production Image | `nginx:alpine` |
| Build Context | `./frontend` |
| Dockerfile Location | Root (`../Dockerfile.frontend.artifactory`) |
| Container Port | 80 |
| Host Port | 3000 |

## Key Changes Summary

1. ✅ Updated `docker-compose.artifactory.yml` to use correct frontend build context (`./frontend`)
2. ✅ Updated `Dockerfile.frontend.artifactory` to work with frontend context
3. ✅ Created `.dockerignore` to exclude `yarn.lock`
4. ✅ Removed `--frozen-lockfile` from yarn install
5. ✅ Added `nginx.conf` for production serving
6. ✅ Created Kubernetes deployment manifests
7. ✅ Created deployment script

## Testing Checklist

- [ ] Docker login to Artifactory succeeds
- [ ] Frontend builds successfully with Artifactory
- [ ] Docker compose builds all services
- [ ] Images can be pushed to Artifactory registry
- [ ] Container starts and health check passes
- [ ] Website loads at http://localhost:3000
- [ ] All navigation links work
- [ ] Markdown pages render correctly
- [ ] Kubernetes deployment succeeds (if using K8s)

## Build Context Explained

**Build Context** is the directory Docker uses as the base for COPY commands.

```dockerfile
# Context: ./frontend (set in docker-compose.artifactory.yml)

COPY package.json ./
# Copies from: /app/frontend/package.json
# To: /app/package.json (in container)

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copies from: /app/frontend/nginx.conf
# To: /etc/nginx/conf.d/default.conf (in container)

COPY . .
# Copies from: /app/frontend/*
# To: /app/* (in container)
```

## Related Files
- `/app/Dockerfile.frontend.artifactory` - Frontend Dockerfile
- `/app/docker-compose.artifactory.yml` - Compose configuration
- `/app/frontend/nginx.conf` - Nginx configuration
- `/app/frontend/.npmrc` - NPM registry config
- `/app/frontend/.dockerignore` - Docker ignore file
- `/app/k8s/deploy-artifactory.sh` - Kubernetes deployment script
- `/app/k8s/deployment.artifactory.yaml` - K8s manifests

## Adding New Pages After Deployment

To add new markdown pages:

1. Add `.md` file to `frontend/src/content/`
2. Add `.md` file to `frontend/public/content/`
3. Register in `frontend/src/config/pages.js`
4. Rebuild and redeploy:
   ```bash
   docker-compose -f docker-compose.artifactory.yml build --no-cache
   docker-compose -f docker-compose.artifactory.yml up -d
   ```
