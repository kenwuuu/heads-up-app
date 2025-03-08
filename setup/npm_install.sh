#!/bin/bash

# Directory to cd into
APP_DIR="heads-up-app"

# Check if the directory exists
if [ -d "$APP_DIR" ]; then
  echo "Changing into $APP_DIR..."
  cd "$APP_DIR"
  
  # Verify that we are in the correct directory
  if [ "$(pwd)" != "$(realpath $APP_DIR)" ]; then
    echo "Error: Current directory is not $APP_DIR."
    exit 1
  fi

  # Run npm install
  echo "Running npm install..."
  npm install
  
  # Check if npm install succeeded
  if [ $? -eq 0 ]; then
    echo "npm install completed successfully."
  else
    echo "npm install failed. Please check the error messages above."
    exit 1
  fi
else
  echo "Error: Directory $APP_DIR not found."
  exit 1
fi
