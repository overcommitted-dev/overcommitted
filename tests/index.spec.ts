import { expect, test } from '@playwright/test';

const indexMeta = {
  title: 'Overcommitted',
  description:
    /Overcommitted is where passion for the craft meets real talk about software engineering/,
};

test('index page has correct meta', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(indexMeta.title);

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', indexMeta.title);

  const twitterTitle = page.locator('meta[name="twitter:title"]');
  await expect(twitterTitle).toHaveAttribute('content', indexMeta.title);

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', indexMeta.description);

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute('content', /^https?:\/\/.+/);

  const twitterImage = page.locator('meta[name="twitter:image:src"]');
  await expect(twitterImage).toHaveAttribute('content', /^https?:\/\/.+/);
});

test('index page displays episodes', async ({ page }) => {
  await page.goto('/');

  // Should have an Episodes heading
  const heading = page.locator('h1').filter({ hasText: 'Episodes' });
  await expect(heading).toBeVisible();

  // Should have at least one episode article
  const articles = page.locator('article');
  const count = await articles.count();
  expect(count).toBeGreaterThan(0);
});
