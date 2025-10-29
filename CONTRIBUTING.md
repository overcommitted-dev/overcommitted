# Contributing to Overcommitted

Welcome! We're excited that you're interested in contributing to Overcommitted. This guide will help you understand the project structure and get you up and running as a contributor.

## About the Project

Overcommitted is a podcast website built with the **Starpod** framework - an open-source tool for creating podcast websites quickly and easily based on [Astro](https://astro.build/). The site features the "Overcommitted" podcast, where passionate software engineers discuss technical decisions, learning strategies, and career challenges.

## Technology Stack

- **Astro** - Static site generator and web framework
- **Preact** - Lightweight React alternative for interactive components  
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript throughout
- **Playwright** - End-to-end testing
- **pnpm** - Package manager
- **Node.js 22+** - Runtime requirement

## Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm (package manager)

### Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/overcommitted.git
   cd overcommitted
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Run tests**
   ```bash
   pnpm test:e2e
   ```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test:e2e` - Run Playwright tests

## Project Structure

### 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration with Vercel adapter |
| `starpod.config.ts` | **Main podcast configuration** - hosts, platforms, RSS |
| `tsconfig.json` | TypeScript configuration |
| `playwright.config.ts` | E2E testing setup |

### 📁 Source Code (`src/`)

#### Pages (`src/pages/`)
- `index.astro` - Homepage
- `[episode].astro` - Dynamic episode pages  
- `about.astro` - About page
- `contact.astro` - Contact form
- `sponsor.astro` - Sponsorship information
- `404.astro` - Error page
- `api/` - API endpoints (contact form, episode pagination)

#### Components (`src/components/`)

**Core Components:**
- `Player.tsx` - Main audio player
- `EpisodeList.tsx` - Episode listings
- `ContactForm.tsx` - Contact form with validation
- `Hosts.astro` - Host information display
- `Platforms.astro` - Podcast platform links

**Player Controls (`src/components/player/`):**
- `PlayButton.tsx` - Play/pause functionality
- `RewindButton/` - Skip backward control
- `ForwardButton/` - Skip forward control  
- `MuteButton/` - Volume control
- `Slider/` - Audio progress slider

Each player component has its own `index.tsx` and `styles.css`.

#### Content (`src/content/`)
- `config.ts` - Astro content collections setup
- `transcripts/` - Episode transcript markdown files

#### Utilities (`src/utils/`)
- `config.ts` - **Critical**: TypeScript types for Starpod configuration
- `dasherize.ts` - String formatting utilities
- `truncate.ts` - Text truncation helpers

#### Styling (`src/styles/`)
- `global.css` - Global styles
- `tailwind.css` - TailwindCSS imports
- `buttons.css` - Button components
- `gradient-icon.css` - Icon utilities

## Key Areas for Contribution

### 🎵 Player Enhancements
The audio player is the heart of the podcast experience. Components are in `src/components/player/`.

**Common improvements:**
- Keyboard shortcuts
- Playback speed controls
- Volume persistence
- Chapter navigation
- Accessibility improvements

### 📝 Content Management
- **Episode transcripts**: Add new `.md` files to `src/content/transcripts/`
- **Blog posts**: Add new `.md` files to `src/content/blog/` (see [Blog Management](#blog-management) section)
- **Podcast metadata**: Update `starpod.config.ts` for hosts, platforms, descriptions
- **Static content**: Update pages in `src/pages/`

### 🎨 UI/UX Improvements
- **Styling**: Modify files in `src/styles/` or component-specific CSS
- **Components**: Enhance existing components or create new ones
- **Responsive design**: Improve mobile experience
- **Accessibility**: Add ARIA labels, keyboard navigation, screen reader support

### 🔌 Integrations
- **Contact form**: Modify `src/pages/api/contact.ts` (requires `SLACK_WEBHOOK` env var)
- **RSS feed**: Enhance episode data processing
- **Analytics**: Improve Vercel Analytics integration
- **SEO**: Enhance meta tags and structured data

### 🧪 Testing
Add tests in the `tests/` directory using Playwright for E2E testing.

#### Blog Testing
The blog functionality includes comprehensive tests in `tests/blog.spec.ts` with **42 test cases** across **3 browsers** (Chromium, Firefox, WebKit) that verify:

- **Blog index page rendering** - Correct title, description, and layout
- **Post listing accuracy** - Matches published posts, correct chronological order
- **Individual post rendering** - Proper content, metadata, and navigation
- **SEO metadata** - Open Graph tags, structured data, canonical URLs
- **Integration** - Homepage blog section, navigation links, breadcrumbs

**Running Blog Tests:**
```bash
# Install Playwright browsers (first time only)
npx playwright install

# Start the development server (required for tests)
pnpm dev

# In another terminal, run the blog tests
pnpm test:e2e tests/blog.spec.ts

# Or run all tests
pnpm test:e2e
```

**What the tests verify:**
- All published blog posts appear in the correct order (newest first)
- Individual blog post pages render correctly with proper metadata
- Blog navigation and integration with the main site works properly
- SEO tags and structured data are properly generated
- Draft posts are properly excluded from the published list

**Blog Content Validation:**
```bash
# Validate all blog posts for proper frontmatter and format
pnpm validate:blog
```

This validates:
- Required frontmatter fields are present
- Date formats are correct
- Content has reasonable length
- Proper markdown structure

## Blog Management

The Overcommitted blog allows the team and community to share written content that complements the podcast. Blog posts are managed using Astro's content collections system.

### Adding a New Blog Post

1. **Create a new markdown file** in `src/content/blog/` with a descriptive filename:
   ```bash
   # Use kebab-case for filenames
   src/content/blog/my-awesome-post.md
   ```

2. **Add frontmatter** at the top of your markdown file:
   ```yaml
   ---
   title: 'Your Post Title'
   description: 'A brief description of your post (used for SEO and previews)'
   publishDate: 2025-10-25  # YYYY-MM-DD format
   author: 'Your Name'
   tags: ['tag1', 'tag2', 'tag3']  # Optional
   draft: false  # Set to true to hide from production
   ---
   ```

3. **Write your content** using standard Markdown syntax below the frontmatter.

### Blog Post Guidelines

#### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title (used in navigation and SEO) |
| `description` | ✅ | Brief summary (1-2 sentences) |
| `publishDate` | ✅ | Publication date (YYYY-MM-DD format) |
| `author` | ✅ | Author name |
| `tags` | ❌ | Array of relevant tags |
| `draft` | ❌ | Set to `true` to hide post (default: `false`) |

#### Content Guidelines

- **Markdown Support**: Use standard Markdown syntax
- **Code Blocks**: Use triple backticks with language specification
- **Images**: Place in `public/blog-images/` and reference as `/blog-images/filename.jpg`
- **Length**: Aim for 800-3000 words for substantial posts
- **Tone**: Match the podcast's authentic, practical, and inclusive approach

#### Example Blog Post

```markdown
---
title: 'Effective Code Review Strategies for Engineering Teams'
description: 'Practical approaches to improve code review quality and team collaboration, based on real-world experience.'
publishDate: 2025-10-25
author: 'Brittany Ellich'
tags: ['code-review', 'team-collaboration', 'best-practices']
draft: false
---

# Effective Code Review Strategies for Engineering Teams

Code reviews are one of the most important practices in modern software development...

## Key Principles

1. **Focus on the code, not the person**
2. **Provide actionable feedback**
3. **Explain the "why" behind suggestions**

```javascript
// Good: Descriptive function name and clear logic
function calculateMonthlyPayment(principal, rate, term) {
  return (principal * rate) / (1 - Math.pow(1 + rate, -term));
}
```

## Conclusion

Effective code reviews require...
```

### Managing Blog Content

#### Publishing Workflow

1. **Draft Posts**: Set `draft: true` in frontmatter to work on posts without publishing
2. **Review Process**: Have team members review posts before publishing
3. **Publication**: Set `draft: false` and the post will appear on the blog
4. **Updates**: Edit the markdown file directly and changes will be reflected automatically

#### Blog URLs

- Blog index: `/blog`
- Individual posts: `/blog/filename` (without `.md` extension)
- Example: `my-awesome-post.md` → `/blog/my-awesome-post`

#### SEO and Metadata

Blog posts automatically include:
- Open Graph meta tags
- Twitter Card data
- Structured data (Schema.org BlogPosting)
- Canonical URLs
- Sitemap inclusion

### Content Ideas

Consider writing about:
- **Technical tutorials** related to podcast topics
- **Deep dives** into engineering concepts
- **Career advice** and growth strategies  
- **Tool reviews** and comparisons
- **Behind-the-scenes** content about podcast production
- **Guest spotlights** and extended interviews
- **Community highlights** and contributions

### Blog File Structure

```
src/content/blog/
├── welcome-to-our-blog.md          # Initial welcome post
├── effective-code-reviews.md       # Example post
└── your-new-post.md                # Your contributions

src/pages/
├── blog.astro                      # Blog index page
└── blog/[slug].astro              # Individual blog post template
```

## Configuration Guide

### Podcast Configuration (`starpod.config.ts`)

This is the most important file for podcast-specific content:

```typescript
export default defineStarpodConfig({
  blurb: 'Short tagline for your show',
  description: 'Longer description (2-4 sentences)',
  hosts: [
    {
      name: 'Host Name',
      bio: 'Host biography',
      img: 'https://github.com/username.png',
      github: 'https://github.com/username',
      bluesky: 'https://bsky.app/profile/username',
      website: 'https://website.com'
    }
  ],
  platforms: {
    apple: 'Apple Podcasts URL',
    spotify: 'Spotify URL', 
    youtube: 'YouTube URL'
    // ... other platforms
  },
  rssFeed: 'https://your-rss-feed.com'
});
```

### Environment Variables

For local development, create a `.env` file:

```bash
# Optional: For contact form functionality
SLACK_WEBHOOK=your_slack_webhook_url
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow existing code patterns
   - Add/update tests as needed
   - Test locally with `pnpm dev`

3. **Test your changes**
   ```bash
   pnpm test:e2e
   pnpm build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Describe what you changed and why
   - Include screenshots for UI changes
   - Reference any related issues

## Code Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Prefer functional components
- **Styling**: Use TailwindCSS classes, avoid inline styles
- **Naming**: Use descriptive, consistent naming conventions
- **Comments**: Add JSDoc comments for functions and complex logic

## Architecture Notes

- **Static Generation**: Site is statically generated with dynamic data from RSS feeds
- **Deployment**: Configured for Vercel with automatic deployments
- **Performance**: Images are optimized, components are lightweight
- **SEO**: Built-in sitemap generation and meta tag management

## Getting Help

- **Issues**: Check existing GitHub issues or create a new one
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Code Review**: All PRs require review before merging

## Starpod Framework

Since this project is built on Starpod, contributions here benefit the entire podcast community. Consider:

- Making changes generic enough to benefit other Starpod users
- Following Starpod conventions and patterns
- Contributing improvements back to the main Starpod project when applicable

Thank you for contributing to Overcommitted! 🎙️