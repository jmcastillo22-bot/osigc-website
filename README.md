# OSI Global Consulting - Main Website (osigc.com)

## Overview
This repository contains the source code for the OSI Global Consulting main website, deployed at [osigc.com](https://osigc.com).

## Tech Stack
- **Frontend**: Static HTML/CSS/JavaScript (React-based)
- **CMS**: Decap CMS (Git-based headless CMS)
- **Deployment**: Netlify (recommended) / GitHub Pages
- **Visual Editor**: Stackbit

## Repository Structure
```
osigc-website/
├── public/                  # Static site files (deploy root)
│   ├── index.html           # Main entry point
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript bundles
│   ├── images/              # Static images & favicon
│   └── admin/               # Decap CMS admin panel
│       ├── index.html       # CMS interface
│       └── config.yml       # CMS configuration
├── content/                 # CMS-managed content (JSON/Markdown)
│   └── pages/
│       └── home.json        # Home page content
├── netlify.toml             # Netlify build & deployment config
├── stackbit.config.ts       # Stackbit visual editor config
├── package.json             # Node.js dependencies & scripts
├── sync-content.js          # Script to sync CMS JSON -> HTML
└── CNAME                    # Custom domain for GitHub Pages
```

## Deployment

### Option 1: Netlify (Recommended)
1. Connect this repo to [Netlify](https://netlify.com)
2. Set **Build command**: (none - static site)
3. Set **Publish directory**: `public`
4. Add custom domain: `osigc.com`
5. Netlify will auto-deploy on every push to `main`

### Option 2: GitHub Pages
1. Go to Settings > Pages
2. Set source to `main` branch, `/public` folder (or use `gh-pages` branch)
3. Add custom domain: `osigc.com`
4. The `CNAME` file is already configured

## Local Development
```bash
# Install dependencies
npm install

# Sync CMS content to HTML
npm run sync

# Serve locally (use any static server)
npx serve public
```

## Decap CMS Admin
Access the CMS at: `https://osigc.com/admin/`
- Backend: Git Gateway (requires Netlify Identity)
- Media uploads: `public/images/uploads/`

## Branches
- `main` - Production branch (auto-deploys to osigc.com)
- `preview` - Preview/staging branch (contains SaveWeb2Zip site snapshot)

## DNS Configuration (DigitalOcean)
Domain `osigc.com` is managed via DigitalOcean DNS.
Point the `A` record to Netlify's load balancer IP or use a `CNAME` to your Netlify subdomain.
