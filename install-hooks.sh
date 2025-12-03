#!/bin/bash

# Install Git hooks for Grimoire

echo "🔧 Installing Grimoire Git Hooks..."

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy pre-commit hook
cp .kiro/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "The pre-commit hook will now:"
echo "  - Detect corporate language in commit messages"
echo "  - Offer to 'spookify' them for consistency"
echo ""
echo "Example transformation:"
echo "  'Fixed memory leak' → 'Sealed spectral breach'"
