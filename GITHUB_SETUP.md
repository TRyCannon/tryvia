# Connecting TRYVIA to GitHub from Replit

## Step-by-Step Instructions

### 1. Create GitHub Repository First
1. Go to https://github.com/new
2. Repository name: `tryvia`
3. Description: `TRYVIA - Live Trivia Game with automatic timing`
4. Set to **Public**
5. **Do NOT check** "Add a README file" (we already have one)
6. **Do NOT check** "Add .gitignore" or "Choose a license" (we have these)
7. Click **"Create repository"**
8. **Copy the repository URL** - it will look like: `https://github.com/yourusername/tryvia.git`

### 2. Connect from Replit
1. In your Replit project, look for the **Version Control** tab in the left sidebar (looks like a Git branch icon)
2. Click on **Version Control**
3. You'll see options to connect to GitHub
4. Click **"Connect to GitHub"** or **"Add remote"**
5. **Paste your repository URL**: `https://github.com/yourusername/tryvia.git`
6. Set branch to `main`
7. Click **"Connect"** or **"Add"**

### 3. Sync Your Code
1. In the Version Control tab, you should see all your files listed
2. Add a commit message: `Initial commit: TRYVIA live trivia game with PostgreSQL database`
3. Click **"Commit & Push"** or **"Push to GitHub"**

### Alternative: Manual Remote Setup
If the GUI doesn't work, here's what the remote URL should be:
- Format: `https://github.com/YOUR_USERNAME/tryvia.git`
- Example: `https://github.com/johndoe/tryvia.git`

Replace `YOUR_USERNAME` with your actual GitHub username.

### What Gets Uploaded
Your complete TRYVIA project including:
- React frontend with trivia game
- Express backend with API
- PostgreSQL database schema
- All documentation and setup files
- Package.json with all dependencies

### After Upload
Anyone can clone and run your project with:
```bash
git clone https://github.com/yourusername/tryvia.git
cd tryvia
npm install
npm run db:push
npm run dev
```

### Troubleshooting
- If you can't find Version Control tab, look for a Git icon in the sidebar
- Make sure you created the GitHub repository first
- Use the exact URL format: `https://github.com/username/tryvia.git`