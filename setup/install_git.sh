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
  # Verify Homebrew installation
  if command_exists brew; then
    echo "Installing Git using Homebrew..."
    brew install git
  else
    echo "Homebrew not found. Please install it manually and try again."
    exit 1
  fi
  # Verify Git installation
  if command_exists git; then
    echo "Git installed successfully."
  else
    echo "Failed to install Git. Please install it manually."
    exit 1
  fi
fi