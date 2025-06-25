# Getting TRYVIA from Replit to GitHub

## The Issue
Replit has Git lock files that prevent direct Git operations. This is normal and protective.

## Solution 1: Connect Replit to GitHub Directly (Easiest)
1. In your Replit project, click the **Version Control** tab (Git icon)
2. Click **"Connect to GitHub"**
3. Create a new repository: `tryvia`
4. Replit will automatically sync your code to GitHub

## Solution 2: Download and Re-upload
1. **Download source files only** (avoid the large node_modules):
   - Right-click each folder: `client/`, `server/`, `shared/`
   - Download individual files: `package.json`, `README.md`, etc.
   
2. **Create GitHub repository**:
   - Go to https://github.com/new
   - Name: `tryvia`
   - Initialize with README: No
   
3. **Upload via GitHub web interface**:
   - Use "uploading an existing file" option
   - Drag and drop your folders/files
   - Commit with message: "Initial commit: TRYVIA live trivia game"

## Solution 3: Clone from Replit's Git URL
1. Find your Replit's Git URL (usually shown in version control)
2. Clone it locally: `git clone [replit-git-url]`
3. Push to your GitHub repository

## What Files to Include
**Essential files** (without node_modules):
- `client/` folder (React frontend)
- `server/` folder (Express backend)
- `shared/` folder (Database schema)
- `package.json` and `package-lock.json`
- `README.md`, `LICENSE`, `GITHUB_SETUP.md`
- Config files: `tsconfig.json`, `tailwind.config.ts`, etc.

**Skip these large folders**:
- `node_modules/` (387MB - restore with `npm install`)
- `.git/` folder
- `.cache/`, `.local/`, `.upm/`

## After Upload to GitHub
```bash
git clone https://github.com/yourusername/tryvia.git
cd tryvia
npm install          # Restores all dependencies
npm run db:push     # Sets up database
npm run dev         # Starts the app
```

Your TRYVIA app will work identically after running `npm install`.