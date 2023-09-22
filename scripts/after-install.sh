#!/bin/bash
cd /var/frontend/
  
# Check if the node_modules directory exists
if [ -d "node_modules/" ]; then
  # If it exists, remove it
  echo "node_modules/ directory exists. Removing it..."
  rm -r node_modules/
else
  # If it doesn't exist, print a message
  echo "node_modules/ directory does not exist. Nothing to do."
fi 

pnpm install
