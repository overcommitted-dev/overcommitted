import { expect, test } from '@playwright/test';

const blogMeta = {
  title: 'Blog - Overcommitted',
  description: 'Insights, tutorials, and thoughts on software engineering from the Overcommitted team and community.'
};

// Expected blog posts based on the actual content files
const expectedPosts = [
  {
    title: 'Welcome to the Overcommitted Blog',
    description: 'Introducing our new blog where we share insights, tutorials, and thoughts on software engineering beyond the podcast.',
    author: 'Overcommitted Team',
    slug: 'welcome-to-our-blog',
    tags: ['announcement', 'meta', 'blog']
  },
  {
    title: 'From Junior to Senior: A Practical Roadmap for Engineering Growth',
    description: 'A comprehensive guide to advancing your software engineering career with concrete skills, milestones, and actionable advice for each stage of growth.',
    author: 'Bethany Janos',
    slug: 'junior-to-senior-roadmap',
    tags: ['career-growth', 'junior-engineer', 'senior-engineer', 'professional-development']
  }
];

test.describe('Blog Page', () => {
  test('renders blog index page correctly', async ({ page }) => {
    await page.goto('/blog');

    // Check page title and meta
    await expect(page).toHaveTitle(blogMeta.title);
    
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', blogMeta.description);

    // Check main heading
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toHaveText('Blog');

    // Check description paragraph
    const descriptionText = page.locator('p:nth-of-type(1)');
    await expect(descriptionText).toContainText('Insights, tutorials, and thoughts on software engineering');
  });

  test('displays correct number of published posts', async ({ page }) => {
    await page.goto('/blog');

    // Count article elements (each post should be in an article tag)
    const articles = page.locator('article');
    const articleCount = await articles.count();
    
    // Should match the number of non-draft posts we have
    expect(articleCount).toBe(expectedPosts.length);
  });

  test('displays posts in correct chronological order (newest first)', async ({ page }) => {
    await page.goto('/blog');

    const articleTitles = page.locator('article h2 a');
    const titles = await articleTitles.allTextContents();
    
    // Should be in order: newest first (junior-to-senior-roadmap, then welcome post)
    expect(titles[0]).toBe('From Junior to Senior: A Practical Roadmap for Engineering Growth');
    expect(titles[1]).toBe('Welcome to the Overcommitted Blog');
  });

  test('displays correct post metadata for each article', async ({ page }) => {
    await page.goto('/blog');

    // Test first post metadata
    const firstArticle = page.locator('article').first();
    
    // Check title link
    const titleLink = firstArticle.locator('h2 a');
    await expect(titleLink).toHaveText('From Junior to Senior: A Practical Roadmap for Engineering Growth');
    await expect(titleLink).toHaveAttribute('href', '/blog/junior-to-senior-roadmap');
    
    // Check description
    const description = firstArticle.locator('p');
    await expect(description).toContainText('comprehensive guide to advancing your software engineering career');
    
    // Check author
    const author = firstArticle.locator('text=By Bethany Janos');
    await expect(author).toBeVisible();
    
    // Check tags
    const tags = firstArticle.locator('span').filter({ hasText: 'career-growth' });
    await expect(tags).toBeVisible();
  });

  test('handles empty state gracefully', async ({ page }) => {
    // This test assumes we might want to test what happens with no posts
    // For now, we'll just verify the structure exists even with posts present
    await page.goto('/blog');
    
    const articlesContainer = page.locator('div.space-y-8');
    await expect(articlesContainer).toBeVisible();
  });
});

test.describe('Individual Blog Posts', () => {
  test('renders welcome blog post correctly', async ({ page }) => {
    await page.goto('/blog/welcome-to-our-blog');

    // Check title
    await expect(page).toHaveTitle('Welcome to the Overcommitted Blog - Overcommitted Blog');
    
    // Check main heading
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toHaveText('Welcome to the Overcommitted Blog');
    
    // Check author
    const author = page.locator('text=By Overcommitted Team');
    await expect(author).toBeVisible();
    
    // Check tags
    const announcementTag = page.locator('span').filter({ hasText: 'announcement' });
    await expect(announcementTag).toBeVisible();
    
    // Check content exists
    const content = page.locator('div.prose');
    await expect(content).toBeVisible();
    await expect(content).toContainText('Welcome to the Overcommitted Blog!');
  });

  test('renders career guide blog post correctly', async ({ page }) => {
    await page.goto('/blog/junior-to-senior-roadmap');

    // Check title
    await expect(page).toHaveTitle('From Junior to Senior: A Practical Roadmap for Engineering Growth - Overcommitted Blog');
    
    // Check main heading
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toHaveText('From Junior to Senior: A Practical Roadmap for Engineering Growth');
    
    // Check author
    const author = page.locator('text=By Bethany Janos');
    await expect(author).toBeVisible();
    
    // Check specific content sections exist
    const content = page.locator('div.prose');
    await expect(content).toContainText('The Reality of Career Progression');
    await expect(content).toContainText('Junior Engineer (0-2 years)');
    await expect(content).toContainText('Senior Engineer (4+ years)');
  });

  test('blog post has proper SEO metadata', async ({ page }) => {
    await page.goto('/blog/junior-to-senior-roadmap');

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', 'From Junior to Senior: A Practical Roadmap for Engineering Growth - Overcommitted Blog');

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', expectedPosts[1].description);

    // Check structured data (Schema.org)
    const scriptTags = page.locator('script[type="application/ld+json"]');
    const scriptCount = await scriptTags.count();
    expect(scriptCount).toBeGreaterThan(0);
  });

  test('blog post has navigation elements', async ({ page }) => {
    await page.goto('/blog/junior-to-senior-roadmap');

    // Check footer navigation
    const backToBlogLink = page.locator('a[href="/blog"]');
    await expect(backToBlogLink).toBeVisible();
    await expect(backToBlogLink).toHaveText('Back to Blog');
    
    const contactLink = page.locator('a[href="/contact"]');
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveText('Get in Touch');
  });

  test('404 for non-existent blog post', async ({ page }) => {
    const response = await page.goto('/blog/non-existent-post');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Blog Integration', () => {
  test('blog link appears in navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check that blog link exists in InfoCard navigation
    const blogLink = page.locator('a[href="/blog"]').filter({ hasText: 'Blog' });
    await expect(blogLink).toBeVisible();
  });

  test('recent blog posts appear on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check for "Latest from the Blog" section
    const blogSection = page.locator('text=Latest from the Blog');
    await expect(blogSection).toBeVisible();
    
    // Check "View all posts" link
    const viewAllLink = page.locator('a[href="/blog"]').filter({ hasText: 'View all posts' });
    await expect(viewAllLink).toBeVisible();
    
    // Check that at least one blog post appears
    const blogPostCards = page.locator('article').filter({ has: page.locator('a[href^="/blog/"]') });
    const cardCount = await blogPostCards.count();
    expect(cardCount).toBeGreaterThan(0);
    expect(cardCount).toBeLessThanOrEqual(3); // Should show max 3 recent posts
  });

  test('breadcrumbs work correctly on blog pages', async ({ page }) => {
    await page.goto('/blog');
    
    // Check breadcrumb navigation exists
    const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbs).toBeVisible();
    
    // Check home link in breadcrumbs
    const homeLink = breadcrumbs.locator('a[href="/"]');
    await expect(homeLink).toHaveText('Home');
  });

  test('blog post links work correctly from blog index', async ({ page }) => {
    await page.goto('/blog');
    
    // Click on first blog post link
    const firstPostLink = page.locator('article h2 a').first();
    const href = await firstPostLink.getAttribute('href');
    
    await firstPostLink.click();
    await page.waitForLoadState('networkidle');
    
    // Should be on the individual blog post page
    expect(page.url()).toContain(href!);
    
    // Should have the blog post title as h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });
});