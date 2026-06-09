import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import type { APIRoute } from 'astro';
import { htmlToText } from 'html-to-text';

import { getAllEpisodes, getShowInfo } from '../lib/rss';
import { getEpisodeTags } from '../data/episodeTags';
import starpodConfig from '../../starpod.config';

const SITE = 'https://overcommitted.dev';

/**
 * /llms-full.txt — the complete text corpus for AI ingestion: every episode's
 * show notes and full transcript in a single plain-text file. Companion to the
 * concise index at /llms.txt. See https://llmstxt.org.
 */

// Raw transcript markdown read at build time, keyed by episode number ("63").
const transcriptsDir = join(process.cwd(), 'src/content/transcripts');

const transcripts: Record<string, string> = {};
for (const file of readdirSync(transcriptsDir)) {
  if (!file.endsWith('.md')) continue;
  const episodeNumber = file.replace(/\.md$/, '');
  transcripts[episodeNumber] = readFileSync(
    `${transcriptsDir}/${file}`,
    'utf-8'
  );
}

function sortEpisodes<T extends { episodeNumber?: string }>(episodes: T[]) {
  return [...episodes].sort((a, b) => {
    const an = Number(a.episodeNumber);
    const bn = Number(b.episodeNumber);
    if (Number.isNaN(an) && Number.isNaN(bn)) return 0;
    if (Number.isNaN(an)) return 1;
    if (Number.isNaN(bn)) return -1;
    return bn - an;
  });
}

export const GET: APIRoute = async () => {
  const show = await getShowInfo();
  const episodes = sortEpisodes(await getAllEpisodes());

  const header = `# ${show.title} — Full Episode Corpus

> ${starpodConfig.blurb}

${starpodConfig.description}

This file contains the show notes and full transcripts for every episode of the
Overcommitted podcast, intended for AI tools and search engines. A concise index
is available at ${SITE}/llms.txt.

Hosted by software engineers at GitHub: Bethany Janos, Brittany Ellich, and
Erika "Eggyhead" Eggemeyer (with former co-host Jonathan Tamsut).

---
`;

  const sections = episodes
    .map((episode) => {
      const publishedDate = new Date(episode.published)
        .toISOString()
        .slice(0, 10);
      const tags = episode.episodeNumber
        ? getEpisodeTags(episode.episodeNumber)
        : [];
      const label =
        episode.episodeNumber && episode.episodeNumber !== 'Bonus'
          ? `Episode ${episode.episodeNumber}: ${episode.title}`
          : `Bonus: ${episode.title}`;

      const showNotes = htmlToText(episode.content, {
        wordwrap: false,
        selectors: [{ selector: 'a', options: { ignoreHref: false } }]
      });

      const transcript = episode.episodeNumber
        ? transcripts[episode.episodeNumber]
        : undefined;

      return `## ${label}

- URL: ${SITE}/${episode.episodeSlug}
- Published: ${publishedDate}${tags.length ? `\n- Topics: ${tags.join(', ')}` : ''}
- Audio: ${episode.audio?.src ?? 'n/a'}

### Show notes

${showNotes.trim()}

### Transcript

${transcript ? transcript.trim() : 'No transcript available for this episode.'}
`;
    })
    .join('\n\n---\n\n');

  const body = `${header}\n${sections}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
