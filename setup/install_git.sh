#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if git is installed
if command_exists git; then
  echo "Git is already installed."
else
  echo "Git is not installed. Checking for Homebrew..."

  # Check if Homebrew is installed
  if command_exists brew; then
    echo "Homebrew is already installed. Installing Git using Homebrew..."
    brew install git
  else
    echo "Homebrew is not installed. Installing Homebrew..."

    # Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Verify Homebrew installation
    if command_exists brew; then
      echo "Homebrew installed successfully. Installing Git using Homebrew..."
      brew install git
    else
      echo "Failed to install Homebrew. Please install it manually and try again."
      exit 1
    fi
  fi

  # Verify Git installation
  if command_exists git; then
    echo "Git installed successfully."
  else
    echo "Failed to install Git. Please install it manually."
    exit 1
  fi
fi