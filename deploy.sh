#!/bin/bash

# === CONFIGURATION ===
APP_DIR="/var/www/html/cms-middle-layer"  # Change this to your app path
BRANCH="main"                     # Git branch to pull
NODE_ENV="production"
NODE_VERSION="18"                 # Adjust your Node.js version

# === SCRIPT START ===
echo "🚀 Starting Deploy Script"

cd $APP_DIR || { echo "❌ Failed to cd $APP_DIR"; exit 1; }

echo "✅ Pulling latest code from branch: $BRANCH"
git pull origin $BRANCH || { echo "❌ Git pull failed"; exit 1; }

echo "✅ Installing dependencies"
npm install || { echo "❌ npm install failed"; exit 1; }

echo "✅ Checking Node.js version"
node -v

echo "✅ Restarting app (PM2)"
# Check if pm2 is installed
if command -v pm2 >/dev/null 2>&1; then
    pm2 restart server.js --name "cms-api" || { echo "❌ PM2 restart failed"; exit 1; }
    pm2 save
else
    echo "⚠️ PM2 not installed, skipping restart"
    echo "You can run: pm2 start server.js --name 'cms-api'"
fi

echo "✅ Deploy completed successfully!"