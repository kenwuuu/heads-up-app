#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if git is installed
if command_exists git; then
  echo "Git is installed. Cloning the repository..."
  git clone https://github.com/kenwuuu/heads-up-app.git
else
  echo "Git is not installed. Please run install_git.sh"
fi