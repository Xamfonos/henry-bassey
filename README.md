# Henry Bassey — Portfolio Site

Built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com).

## Stack

- **Framework**: Astro 4 (static output)
- **Styling**: Custom CSS with CSS variables (no Tailwind dependency needed — can be removed from package.json if unused)
- **Content**: Astro Content Collections (Markdown files)
- **Deployment**: Vercel
- **Domain**: Namecheap (DNS pointed to Vercel)

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Adding New Content

### New Thought (blog post)

Create a new `.md` file in `src/content/thoughts/`:

```markdown
---
title: "Your post title"
date: 2025-08-01
category: "Developer Marketing"
badge: "Dev Marketing"
excerpt: "One sentence that summarises the post."
---

Your full post content in Markdown goes here.
```

The post is immediately available at `/thoughts/your-filename`.

### New Short

Create a new `.md` file in `src/content/shorts/`:

```markdown
---
title: "Your short title"
date: 2025-08-01
tag: "SEO"
excerpt: "The short itself — one punchy paragraph."
---

Optional expanded content here.
```

Available at `/shorts/your-filename`.

---

## Deployment (Vercel + Namecheap)

### First deploy

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Astro — hit Deploy
4. Your site is live on a `*.vercel.app` URL

### Connect your Namecheap domain

1. In Vercel: Project Settings → Domains → Add `henrybassey.com`
2. In Namecheap DNS panel, set:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
3. Wait 5–15 min for propagation
4. Vercel auto-provisions SSL — done

### Future updates

```bash
git add .
git commit -m "add new short: your title"
git push
```

Vercel redeploys automatically on every push. Zero downtime.

---

## Project Structure

```
src/
├── content/
│   ├── config.ts          # Content collection schemas
│   ├── thoughts/          # Blog posts (Markdown)
│   └── shorts/            # Short-form posts (Markdown)
├── layouts/
│   ├── Layout.astro       # Base layout (nav + footer)
│   └── PostLayout.astro   # Layout for individual posts
├── pages/
│   ├── index.astro        # Homepage (all sections)
│   ├── thoughts/
│   │   ├── index.astro    # All thoughts list
│   │   └── [slug].astro   # Individual thought
│   ├── shorts/
│   │   ├── index.astro    # All shorts list
│   │   └── [slug].astro   # Individual short
│   └── 404.astro
└── styles/
    └── global.css         # All CSS — design tokens + components
```
