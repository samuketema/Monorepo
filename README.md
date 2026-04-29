# Monorepo Project

This is a modular system built using a Monorepo approach (npm workspaces).

## Structure
- \`packages/ui-components\`: Shared UI components structure.
- \`packages/utils\`: Reusable utility functions (date formulation, string manipulation, etc).
- \`packages/feature-x\`: Feature 1 integrating UI component and utility usage.
- \`packages/feature-y\`: Feature 2 integrating UI component and utility usage.
- \`apps/*\`: Individual Next.js/Vite systems containing only assembly and configuration.

## Setup Instructions
1. Run \`npm install\` from the root to install and link all workspaces.
2. Run \`npm run dev\` from the root to start development servers across workspaces.

## Building
Run \`npm run build\` from the root to build all applications.