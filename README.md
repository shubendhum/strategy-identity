# Identity Strategy Website

A modern, enterprise-focused website presenting the Identity Strategy documentation with dynamic markdown rendering.

## Features

- Clean enterprise design with dark teal/grey/white color palette
- **Dynamic page rendering** - Add new markdown files without code changes
- Responsive layout for all screen sizes
- Local SVG diagrams and icons
- Docker support for local development

## Adding New Pages

To add a new page to the website:

### Step 1: Add your Markdown file

Place your markdown file in `/frontend/src/content/`:

```
/frontend/src/content/my-new-page.md
```

### Step 2: Copy to public folder (for development)

```bash
cp src/content/my-new-page.md public/content/
```

### Step 3: Register the page in config

Edit `/frontend/src/config/pages.js` and add your new page:

```javascript
{
  id: 'my-new-page',           // URL slug: /pages/my-new-page
  title: 'My New Page Title',  // Page header title
  description: 'Description shown in the hero section.',
  icon: 'FileText',            // Icon from lucide-react (see iconMap)
  file: 'my-new-page.md',      // Markdown filename
  navLabel: 'New Page',        // Short label for navigation
  order: 9,                    // Sort order (lower = earlier)
  showInNav: true,             // Whether to show in nav menu
},
```

### Available Icons

The following icons are available (from lucide-react):
- `Shield` - Security related
- `AlertTriangle` - Warnings/Changes
- `RefreshCcw` - Transformation
- `Briefcase` - Business
- `FileText` - Documents
- `TrendingDown` - Cost/Metrics
- `Target` - Goals/Success
- `CheckCircle2` - Completion

To add more icons, update the `iconMap` in `/frontend/src/pages/MarkdownPage.jsx`.

## Pages Included

1. **Overview** (`/`) - Main landing page
2. **Executive Summary** (`/pages/executive-summary`)
3. **Why Change** (`/pages/why-change`)
4. **What Is Changing** (`/pages/what-is-changing`)
5. **Security Posture** (`/pages/security-posture`)
6. **Cost Reduction** (`/pages/reduces-cost`)
7. **Business Experience** (`/pages/business-experience`)
8. **Success Metrics** (`/pages/success`)

## Local Development

### Running with Docker

```bash
docker-compose up --build
# Access at http://localhost:3000
```

### Running without Docker

```bash
cd frontend
yarn install
yarn start
# Access at http://localhost:3000
```

## Project Structure

```
/app
├── docker-compose.yml
├── README.md
└── frontend/
    ├── Dockerfile
    ├── .npmrc
    ├── public/
    │   ├── assets/           # SVG diagrams and icons
    │   └── content/          # Markdown files (copied for serving)
    └── src/
        ├── config/
        │   └── pages.js      # PAGE CONFIGURATION - edit this to add pages
        ├── content/          # Source markdown files
        ├── components/
        └── pages/
```

## Docker Configuration

Uses Macquarie artifactory:

- **Base Image**: `artifactory.devtools.syd.c1.macquarie.com:9956/node:18-alpine`
- **NPM Registry**: `https://artifactory.devtools.syd.c1.macquarie.com:9996/npm-virtual`

## Markdown Features

The markdown renderer supports:
- Headings (H1, H2, H3)
- Paragraphs
- Bullet lists (with checkmark icons)
- Numbered lists
- **Bold text**
- `Inline code`
- Code blocks
- Blockquotes
- Horizontal rules

## Design System

- **Primary Color**: Dark Teal (`hsl(180, 45%, 22%)`)
- **Typography**: IBM Plex Sans / IBM Plex Mono
- **Components**: Shadcn/UI with custom styling
