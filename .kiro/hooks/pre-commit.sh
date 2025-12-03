#!/bin/bash

# Pre-commit hook: Spookify corporate commit messages

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Check if message is too corporate
if echo "$COMMIT_MSG" | grep -qiE "fix|update|refactor|optimize"; then
  echo "⚠️  Corporate language detected. Translating to eldritch..."
  
  # Transform common patterns
  SPOOKY_MSG=$(echo "$COMMIT_MSG" | \
    sed 's/[Ff]ixed/Sealed/g' | \
    sed 's/[Uu]pdated/Transmuted/g' | \
    sed 's/[Rr]efactored/Realigned/g' | \
    sed 's/[Oo]ptimized/Accelerated communion with/g' | \
    sed 's/bug/spectral breach/g' | \
    sed 's/memory leak/void seepage/g' | \
    sed 's/auth/gatekeeper/g')
  
  echo "Original: $COMMIT_MSG"
  echo "Spookified: $SPOOKY_MSG"
  echo ""
  echo "Accept spooky version? (y/n)"
  read -r response
  
  if [ "$response" = "y" ]; then
    echo "$SPOOKY_MSG" > "$COMMIT_MSG_FILE"
  fi
fi
