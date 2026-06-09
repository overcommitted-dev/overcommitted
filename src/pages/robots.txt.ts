import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL, site: URL | undefined) => `
# Overcommitted — https://overcommitted.dev
# We welcome search engines and AI assistants. See ${new URL('llms.txt', site).href}

User-agent: *
Allow: /

# AI crawlers are explicitly welcome to index and cite the show.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL, site));
};