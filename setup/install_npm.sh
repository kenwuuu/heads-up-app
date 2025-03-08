#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if git is installed
if command_exists npm; then
  echo "npm is already installed."
else
  echo "npm is not installed. Checking for Homebrew..."
  # Verify Homebrew installation
  if command_exists brew; then
    echo "Installing npm using Homebrew..."
    brew install git
  else
    echo "Homebrew not found. Please install it manually and try again."
    exit 1
  fi
  # Verify npm installation
  if command_exists npm; then
    echo "npm installed successfully."
  else
    echo "Failed to install npm. Please install it manually."
    exit 1
  fi
fi