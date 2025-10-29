# Blog Management Guide

This directory contains all blog posts for the Overcommitted website. Blog posts are written in Markdown and use Astro's content collections system.

## Quick Start

### Adding a New Post

1. Create a new `.md` file in this directory with a descriptive filename:
   ```
   effective-code-reviews.md
   managing-technical-debt.md
   junior-to-senior-engineer-guide.md
   ```

2. Add frontmatter at the top:
   ```yaml
   ---
   title: 'Your Post Title'
   description: 'Brief description for SEO and previews'
   publishDate: 2025-10-25
   author: 'Your Name'
   tags: ['tag1', 'tag2']
   draft: false
   ---
   ```

3. Write your content using Markdown syntax

### Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | Post title | `'Effective Code Reviews'` |
| `description` | ✅ | Brief summary (1-2 sentences) | `'Learn practical strategies for conducting meaningful code reviews that improve code quality and team collaboration.'` |
| `publishDate` | ✅ | Date in YYYY-MM-DD format | `2025-10-25` |
| `author` | ✅ | Author name | `'Brittany Ellich'` |
| `tags` | ❌ | Array of relevant tags | `['code-review', 'collaboration']` |
| `draft` | ❌ | Hide from production if true | `false` (default) |

## Content Guidelines

### Writing Style
- **Authentic and conversational** - Match the podcast's tone
- **Practical and actionable** - Provide concrete advice readers can use
- **Inclusive** - Write for engineers at all experience levels
- **Well-structured** - Use clear headings and logical flow

### Technical Content
- **Code examples** - Use proper syntax highlighting
- **Screenshots** - Place images in `public/blog-images/`
- **Links** - Reference relevant resources and tools
- **Real examples** - Share actual experiences when possible

### Content Ideas
- Deep dives into podcast topics
- Tutorial content and how-to guides
- Career advice and growth strategies
- Tool comparisons and reviews
- Engineering team practices
- Personal development insights

## File Organization

```
src/content/blog/
├── README.md                       # This file
├── welcome-to-our-blog.md         # Welcome post
└── your-posts-here.md             # Add your content here
```

## Publishing Workflow

### Draft Posts
Set `draft: true` to work on posts without publishing them:
```yaml
---
title: 'Work in Progress'
draft: true  # Won't appear on the website
---
```

### Publishing
1. Complete your post content
2. Set `draft: false` (or remove the draft field)
3. Commit and push your changes
4. Post will automatically appear on the website

### URLs
Posts automatically get URLs based on their filename:
- `effective-code-reviews.md` → `/blog/effective-code-reviews`
- `my-awesome-post.md` → `/blog/my-awesome-post`

## Example Post

```markdown
---
title: 'Building Better APIs: Lessons from Production'
description: 'Key insights and practical tips for designing robust APIs based on real-world experience building and maintaining production systems.'
publishDate: 2025-10-25
author: 'Jonathan Tamsut'
tags: ['apis', 'backend', 'design', 'best-practices']
draft: false
---

# Building Better APIs: Lessons from Production

Over the past few years working on production APIs, I've learned some hard lessons about what makes APIs truly robust and developer-friendly...

## Key Principles

### 1. Design for Your Users
Think about who will be consuming your API...

### 2. Consistency is King
Consistent patterns make APIs predictable...

## Common Pitfalls to Avoid

1. **Inconsistent naming conventions**
2. **Poor error messages**
3. **Missing documentation**

## Code Example

```javascript
// Good: Clear, consistent API design
GET /api/v1/users/123
POST /api/v1/users
PUT /api/v1/users/123
DELETE /api/v1/users/123
```

## Conclusion

Building great APIs is an iterative process...
```

## Need Help?

- Check the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for more details
- Look at existing posts for examples
- Reach out to the team if you have questions

Happy writing! 📝