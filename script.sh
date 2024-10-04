#!/bin/bash

echo "Starting script execution..."

# Change to the project directory
cd /home/kenya123/codeLabs/clients || { echo "Failed to change directory"; exit 1; }
echo "Changed directory successfully."

# Check if npm is available
npm --version

# Install dependencies
npm install

# Run tests (modify if you have a different test command)
if npm test; then
    echo "Tests passed successfully."
else
    echo "Tests failed."
    exit 1  # Exit with failure if tests fail
fi

# Uncomment if you want to start the server
# npm start

echo "Script execution finished."
