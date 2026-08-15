# Tushar Solanki Portfolio - Deployment Guide

This document outlines the step-by-step instructions for deploying Tushar Solanki's professional portfolio website to **GitHub Pages** or **Netlify**.

---

## 1. Project Overview

The portfolio is built using modern web standards (React 19, Vite, Tailwind CSS, and Lucide icons). It features a responsive layout, smooth scrolling, interactive project showcases, and a refined minimalist professional design.

---

## 2. Preparing the Build

Before deploying to any static hosting provider, generate the production build to ensure all assets and routes compile correctly.

1. Install project dependencies:
   ```bash
   pnpm install
   ```

2. Build the production bundle:
   ```bash
   pnpm build
   ```

This generates an optimized static website inside the `dist/public/` directory. The project also creates a server bundle at `dist/index.js`, but GitHub Pages and Netlify should publish `dist/public/` for this frontend-only portfolio.

---

## 3. Deploying to Netlify (Recommended for Quick Setup)

Netlify offers seamless static hosting with continuous deployment from GitHub or direct drag-and-drop.

### Option A: Drag & Drop (Fastest)
1. Run `pnpm build` locally.
2. Log in to your [Netlify Dashboard](https://app.netlify.com/).
3. Drag and drop the `dist/public/` folder directly onto the Netlify deploy drop zone.
4. Your site will be live instantly with a secure `*.netlify.app` domain. You can later bind a custom domain in Site Settings. The ready-made `netlify.toml` in this project already points Netlify to `dist/public/`.

### Option B: Continuous Deployment via GitHub
1. Push your repository to GitHub.
2. In Netlify, click **"Add new site"** > **"Import an existing project"**. The included `netlify.toml` can supply the build command and publish directory automatically.
3. Connect your GitHub account and select your repository (`tushar-portfolio`).
4. Configure the build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist/public`
5. Click **Deploy site**.

---

## 4. Deploying to GitHub Pages

GitHub Pages is ideal for hosting developer portfolios directly from a GitHub repository.

1. Update `vite.config.ts` to include your repository base path if deploying to a subpath (e.g., `base: '/tushar-portfolio/'`). For custom domains or root deployments (`username.github.io`), leave `base: '/'`.
2. Install the GitHub Pages deployment helper or build script, or use GitHub Actions:
   
Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 10
          run_install: false

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install

      - name: Build project
        run: pnpm build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

3. Push the changes to GitHub. In the repository, open **Settings** > **Pages**, select **GitHub Actions** as the source, and then push to the `main` branch. The included workflow publishes the `dist/public/` output automatically.

---

## 5. Support & Customization

- **Contact Info & Links:** Update your email (`tusharsolanki9845@gmail.com`), LinkedIn, and GitHub links directly in `client/src/pages/Home.tsx`.
- **Styling:** Modify design tokens, colors, and fonts in `client/src/index.css`.
