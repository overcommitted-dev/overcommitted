# Overcommitted Podcast - Copilot Instructions

This file provides context for GitHub Copilot when working with the Overcommitted podcast website.

## Project Overview

Overcommitted is a software engineering podcast hosted by engineers from GitHub. The website is built with:
- **Astro** - Static site generator
- **Preact** - For interactive components
- **Tailwind CSS** - Styling (with Catppuccin Mocha/Latte theme)
- **TypeScript** - Type safety

## Key Directories

- `src/pages/` - Astro pages (routes)
- `src/components/` - UI components (Astro and Preact)
- `src/content/transcripts/` - Episode transcripts (markdown)
- `src/content/blog/` - Blog posts (markdown)
- `src/data/` - Data files including episode tags
- `src/styles/` - Global styles and Tailwind config
- `starpod.config.ts` - Podcast configuration (hosts, platforms, etc.)

---

## Skills

### Skill: Tag New Episode

**Trigger**: "Tag episode [number]" or "Add tags for episode [number]"

**Description**: Analyzes a podcast episode transcript and assigns 3-5 relevant tags.

**Available Tags**:
1. Career Development
2. AI & Developer Tools
3. Technical Deep Dives
4. Leadership & Management
5. Non-traditional Paths to Tech
6. Developer Experience/DevRel
7. Imposter Syndrome & Mental Health
8. Productivity & Learning
9. Open Source & GitHub
10. Product & Engineering Collaboration

**Process**:
1. Read the transcript at `src/content/transcripts/{episode_number}.md`
2. Identify main themes discussed in the episode
3. Select 3-5 most relevant tags
4. Add the tags to `src/data/episodeTags.ts` in the `episodeTags` object

**Example**:
```typescript
// Add to src/data/episodeTags.ts
'44': ['Career Development', 'AI & Developer Tools', 'Technical Deep Dives'],
```

**Guidelines**:
- Primary topic should be listed first
- Consider the guest's background and expertise
- Look for discussions about feelings/doubt → use "Imposter Syndrome & Mental Health"
- Retrospectives and goal discussions → use "Productivity & Learning"
- DevRel guests or content creation topics → use "Developer Experience/DevRel"
- Career changers or unconventional paths → use "Non-traditional Paths to Tech"

---

### Skill: Add Notable Guest

**Trigger**: "Add [name] as a notable guest"

**Description**: Adds a guest to the notable guests section on the About page.

**Process**:
1. Open `src/pages/about.astro`
2. Add the guest to the `notableGuests` array with:
   - `name`: Guest's full name
   - `title`: Their role/title
   - `episode`: Episode number they appeared on

---

### Skill: Create Blog Post

**Trigger**: "Create a blog post about [topic]"

**Description**: Creates a new blog post with proper frontmatter.

**Process**:
1. Create a new file in `src/content/blog/` with a slugified filename
2. Add frontmatter with: title, description, publishDate, author, tags, draft
3. Use tags that align with the episode tag categories where possible

---

## Theme Colors (Catppuccin)

**Light Mode (Latte)**:
- Base: #eff1f5
- Text: #4c4f69
- Mauve: #8839ef
- Pink: #ea76cb

**Dark Mode (Mocha)**:
- Base: #1e1e2e
- Text: #cdd6f4
- Mauve: #cba6f7
- Pink: #f5c2e7
