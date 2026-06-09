import type { APIRoute } from 'astro';
import { htmlToText } from 'html-to-text';

import { getAllEpisodes, getShowInfo } from '../lib/rss';
import { getEpisodeTags, AVAILABLE_TAGS } from '../data/episodeTags';
import starpodConfig from '../../starpod.config';

const SITE = 'https://overcommitted.dev';

/**
 * /llms.txt — a concise, structured index of the site for large language
 * models and AI-powered search, following the spec at https://llmstxt.org.
 *
 * This is the "table of contents" version. The full corpus (show notes +
 * transcripts) lives at /llms-full.txt.
 */
function sortEpisodes<T extends { episodeNumber?: string }>(episodes: T[]) {
  return [...episodes].sort((a, b) => {
    const an = Number(a.episodeNumber);
    const bn = Number(b.episodeNumber);
    // Numbered episodes descending (newest first); non-numeric (Bonus) last.
    if (Number.isNaN(an) && Number.isNaN(bn)) return 0;
    if (Number.isNaN(an)) return 1;
    if (Number.isNaN(bn)) return -1;
    return bn - an;
  });
}

export const GET: APIRoute = async () => {
  const show = await getShowInfo();
  const episodes = sortEpisodes(await getAllEpisodes());

  const hostLines = starpodConfig.hosts
    .map((host) => {
      const links = [host.website, host.github, host.bluesky]
        .filter(Boolean)
        .join(' · ');
      return `- **${host.name}** — ${htmlToText(host.bio, {
        wordwrap: false
      })}${links ? ` (${links})` : ''}`;
    })
    .join('\n');

  const platformLines = [
    starpodConfig.platforms.apple && `- [Apple Podcasts](${starpodConfig.platforms.apple})`,
    starpodConfig.platforms.spotify && `- [Spotify](${starpodConfig.platforms.spotify})`,
    starpodConfig.platforms.youtube && `- [YouTube](${starpodConfig.platforms.youtube})`,
    starpodConfig.platforms.amazonMusic && `- [Amazon Music](${starpodConfig.platforms.amazonMusic})`,
    starpodConfig.platforms.bluesky && `- [Bluesky](${starpodConfig.platforms.bluesky})`,
    starpodConfig.rssFeed && `- [RSS feed](${starpodConfig.rssFeed})`,
  ]
    .filter(Boolean)
    .join('\n');

  const episodeLines = episodes
    .map((episode) => {
      const tags = episode.episodeNumber
        ? getEpisodeTags(episode.episodeNumber)
        : [];
      const label =
        episode.episodeNumber && episode.episodeNumber !== 'Bonus'
          ? `Episode ${episode.episodeNumber}`
          : 'Bonus episode';
      const tagSuffix = tags.length ? ` _(Topics: ${tags.join(', ')})_` : '';
      return `- [${label}: ${episode.title}](${SITE}/${episode.episodeSlug}): ${episode.description}${tagSuffix}`;
    })
    .join('\n');

  const body = `# ${show.title}

> ${starpodConfig.blurb}

${starpodConfig.description}

Overcommitted is a weekly software engineering podcast hosted by software engineers at GitHub (Bethany Janos, Brittany Ellich, and Erika "Eggyhead" Eggemeyer). Episodes alternate between deep-dive discussions among the hosts and interviews with industry leaders, authors, and practitioners. Full transcripts are available for most episodes.

## Key pages

- [Episodes (home)](${SITE}/): The full episode catalog with audio player.
- [About & FAQ](${SITE}/about): Show overview, host bios, and frequently asked questions.
- [Topics](${SITE}/topics): Browse episodes by topic/tag.
- [Blog](${SITE}/blog): Written posts from the hosts.
- [Sponsor](${SITE}/sponsor): Advertising and sponsorship information.
- [Contact](${SITE}/contact): Reach the hosts or pitch yourself as a guest.

## Listen & subscribe

${platformLines}
- [Discord community](https://discord.gg/d9gZyYuqKd): 140+ engineers discussing the show and the craft.

## Hosts

${hostLines}

## Topics covered

${AVAILABLE_TAGS.map((tag) => `- ${tag}`).join('\n')}

## Episodes

${episodeLines}

## Full content for AI

- [Full transcripts and show notes](${SITE}/llms-full.txt): The complete text of every episode's show notes and transcript in one file.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
