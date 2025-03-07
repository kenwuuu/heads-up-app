#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Directory to cd into
APP_DIR="heads-up-app"

# List of files to check and execute
FILES=(
  "install_brew.sh"
  "install_git.sh"
  "clone_repo.sh"
#  "npm_install.sh"
)

# Loop through each file in the list
for FILE in "${FILES[@]}"; do
  echo "Checking file: $FILE"

  # Check if the file exists
  if [ -f "$FILE" ]; then
    echo "File $FILE exists."

    # Make the file executable
    echo "Making $FILE executable..."
    chmod +x "$FILE"

    # Run the file
    echo "Running $FILE..."
    ./"$FILE"
  else
    echo "Error: File $FILE does not exist."
  fi

  echo "-----------------------------"
done


# Directory to cd into
APP_DIR="heads-up-app"

# Check if the directory exists
if [ -d "$APP_DIR" ]; then
  echo "Changing into $APP_DIR..."
  cd "$APP_DIR" || exit

  # Run npm install
  echo "Running npm install..."
#  npm install

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

