#!/bin/bash

# Identity Strategy - Artifactory Deployment Script
# This script deploys the Identity Strategy website to Kubernetes

set -e

NAMESPACE="identity-strategy"
ARTIFACTORY_SERVER="artifactory.devtools.syd.c1.macquarie.com:9956"

echo "======================================"
echo "Identity Strategy - K8s Deployment"
echo "======================================"

# Create namespace if it doesn't exist
echo ""
echo "Step 1: Creating namespace '$NAMESPACE'..."
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Create Artifactory secret
echo ""
echo "Step 2: Creating Artifactory image pull secret..."
echo "Please enter your Artifactory credentials:"
read -p "Username: " ARTIFACTORY_USER
read -sp "Password: " ARTIFACTORY_PASS
echo ""
read -p "Email: " ARTIFACTORY_EMAIL

kubectl create secret docker-registry artifactory-secret \
  --docker-server=$ARTIFACTORY_SERVER \
  --docker-username=$ARTIFACTORY_USER \
  --docker-password=$ARTIFACTORY_PASS \
  --docker-email=$ARTIFACTORY_EMAIL \
  -n $NAMESPACE \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✓ Artifactory secret created"

# Deploy application
echo ""
echo "Step 3: Deploying Identity Strategy website..."
kubectl apply -f k8s/deployment.artifactory.yaml -n $NAMESPACE

# Wait for deployment
echo ""
echo "Step 4: Waiting for deployment to be ready..."
kubectl rollout status deployment/identity-strategy -n $NAMESPACE --timeout=120s

# Show status
echo ""
echo "======================================"
echo "Deployment Complete!"
echo "======================================"
echo ""
echo "Resources created:"
kubectl get all -n $NAMESPACE
echo ""
echo "To access the website locally, run:"
echo "  kubectl port-forward service/identity-strategy 3000:80 -n $NAMESPACE"
echo ""
echo "Then open: http://localhost:3000"
echo ""
