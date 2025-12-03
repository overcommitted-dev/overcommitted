import { expect, test } from '@playwright/test';

// Note: These tests use actual episodes from the Overcommitted podcast RSS feed
// Episode numbers and slugs may change as new episodes are published
// Update these values if tests fail due to feed changes

test.describe('Episode Pages', () => {
  test('loads latest episode page', async ({ page }) => {
    await page.goto('/');
    
    // Get the first episode link and navigate to it
    const firstEpisodeLink = page.locator('article a').first();
    const href = await firstEpisodeLink.getAttribute('href');
    await page.goto(href!);
    
    // Should be on an episode page (use first h1 to avoid strict mode violation)
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Should have meta tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });
  
  test('episode page has required metadata', async ({ page }) => {
    await page.goto('/');
    
    // Get first episode link and navigate to it
    const firstEpisodeLink = page.locator('article a').first();
    const href = await firstEpisodeLink.getAttribute('href');
    await page.goto(href!);
    
    // Check for required meta tags
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
    
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /^https?:\/\/.+/);
  });
  
  test('404 for non-existent episode', async ({ page }) => {
    const response = await page.goto('/999999');
    expect(response?.status()).toBe(404);
  });
});
