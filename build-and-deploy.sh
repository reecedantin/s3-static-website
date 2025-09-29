#!/bin/bash
set -e

echo "🏗️  Building frontend..."
cd frontend
npm run build
cd ..

echo "🚀 Deploying with CDK..."
npx cdk deploy

echo "🎉 Deployment complete!"
echo "Check the CDK outputs for your application URLs"
