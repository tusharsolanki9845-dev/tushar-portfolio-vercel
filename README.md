# Tushar Solanki — Portfolio

The personal portfolio of **Tushar Solanki**, a freelance web developer and B.Tech CSE (AI & ML) student. The site presents selected products, technical capabilities, résumé access, and contact information in a focused client-facing experience.

**Live portfolio:** [tushar-portfolio-vercel.vercel.app](https://tushar-portfolio-vercel.vercel.app/)

## What the site communicates

The portfolio is designed to give clients and recruiters a clear first impression of Tushar’s work. It highlights practical web products, modern frontend development, backend and database experience, deployment capability, and a direct route to contact and résumé information.

## Technology

| Area | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4 and shadcn/ui components |
| Interaction | Framer Motion and Wouter routing |
| Hosting | Vercel static deployment |
| Build output | `dist/public` |

## Local development

Use Node.js 22 or later and pnpm. Install dependencies, start the development server, and run the production build with the following commands:

```bash
pnpm install
pnpm run dev
pnpm run build:vercel
```

The production build is written to `dist/public`. The repository includes `vercel.json`, which defines the Vercel build command, output directory, SPA fallback, and security headers.

## Deployment

The repository is connected to Vercel through GitHub. Production deployments use `pnpm run build:vercel` and publish `dist/public`. The public project domain is intended for resumes, proposals, email signatures, and client conversations.

The project is a static frontend and does not require server-side secrets. Private configuration files and build artifacts are excluded from version control and deployment. Never commit API keys, service-role credentials, OAuth secrets, payment credentials, or private environment files.

## Project structure

| Path | Purpose |
|---|---|
| `client/src/` | React application source |
| `client/src/pages/Home.tsx` | Main portfolio page |
| `client/src/App.tsx` | Application routing and shell |
| `public/` | Public static assets |
| `vercel.json` | Vercel build, SPA, and security configuration |
| `dist/public/` | Generated production output; not committed |

## Professional contact

For project work, collaboration, or technical conversations, visit the [live portfolio](https://tushar-portfolio-vercel.vercel.app/) and use the contact details presented there.
