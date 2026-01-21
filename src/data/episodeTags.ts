/**
 * Episode Tags Data
 * 
 * This file maps episode numbers to their associated tags.
 * Tags help with discoverability and LLM searchability.
 * 
 * Available Tags:
 * - Career Development
 * - AI & Developer Tools
 * - Technical Deep Dives
 * - Leadership & Management
 * - Non-traditional Paths to Tech
 * - Developer Experience/DevRel
 * - Imposter Syndrome & Mental Health
 * - Productivity & Learning
 * - Open Source & GitHub
 * - Product & Engineering Collaboration
 */

export const AVAILABLE_TAGS = [
  'Career Development',
  'AI & Developer Tools',
  'Technical Deep Dives',
  'Leadership & Management',
  'Non-traditional Paths to Tech',
  'Developer Experience/DevRel',
  'Imposter Syndrome & Mental Health',
  'Productivity & Learning',
  'Open Source & GitHub',
  'Product & Engineering Collaboration',
] as const;

export type EpisodeTag = typeof AVAILABLE_TAGS[number];

export interface EpisodeTagData {
  episodeNumber: number | string;
  tags: EpisodeTag[];
}

/**
 * Map of episode numbers to their tags
 * Each episode should have 3-5 relevant tags
 */
export const episodeTags: Record<string, EpisodeTag[]> = {
  '1': ['Imposter Syndrome & Mental Health', 'Non-traditional Paths to Tech', 'Career Development'],
  '2': ['Productivity & Learning', 'Career Development'],
  '3': ['Productivity & Learning', 'AI & Developer Tools', 'Technical Deep Dives'],
  '4': ['AI & Developer Tools', 'Productivity & Learning', 'Technical Deep Dives'],
  '5': ['AI & Developer Tools', 'Career Development', 'Imposter Syndrome & Mental Health'],
  '6': ['Technical Deep Dives', 'Developer Experience/DevRel', 'Productivity & Learning'],
  '7': ['Leadership & Management', 'Product & Engineering Collaboration', 'Productivity & Learning'],
  '8': ['Technical Deep Dives', 'Leadership & Management', 'Career Development'],
  '9': ['Productivity & Learning', 'Career Development'],
  '10': ['Product & Engineering Collaboration', 'Leadership & Management', 'Career Development'],
  '11': ['Productivity & Learning', 'Technical Deep Dives', 'Leadership & Management'],
  '12': ['Developer Experience/DevRel', 'Career Development', 'Productivity & Learning'],
  '13': ['AI & Developer Tools', 'Career Development'],
  '14': ['Technical Deep Dives', 'Productivity & Learning', 'Open Source & GitHub'],
  '15': ['Productivity & Learning', 'Career Development'],
  '16': ['Technical Deep Dives', 'Leadership & Management'],
  '17': ['Non-traditional Paths to Tech', 'Leadership & Management', 'Career Development'],
  '18': ['Career Development', 'Leadership & Management', 'Productivity & Learning'],
  '19': ['Technical Deep Dives', 'Open Source & GitHub'],
  '20': ['Career Development', 'Developer Experience/DevRel', 'Imposter Syndrome & Mental Health'],
  '21': ['AI & Developer Tools', 'Technical Deep Dives', 'Productivity & Learning'],
  '22': ['Productivity & Learning', 'Imposter Syndrome & Mental Health', 'Leadership & Management'],
  '23': ['Developer Experience/DevRel', 'Productivity & Learning', 'Career Development'],
  '24': ['AI & Developer Tools', 'Imposter Syndrome & Mental Health', 'Career Development'],
  '25': ['Developer Experience/DevRel', 'Non-traditional Paths to Tech', 'Productivity & Learning', 'Career Development'],
  '26': ['Leadership & Management', 'Career Development', 'Product & Engineering Collaboration'],
  '27': ['Productivity & Learning', 'Career Development'],
  '28': ['Non-traditional Paths to Tech', 'Leadership & Management', 'Career Development'],
  '29': ['Technical Deep Dives', 'Non-traditional Paths to Tech', 'AI & Developer Tools'],
  '30': ['Career Development', 'Leadership & Management', 'Open Source & GitHub', 'Productivity & Learning'],
  '31': ['Productivity & Learning', 'AI & Developer Tools', 'Technical Deep Dives'],
  '32': ['Non-traditional Paths to Tech', 'Leadership & Management', 'Career Development'],
  '33': ['Technical Deep Dives', 'Leadership & Management', 'Productivity & Learning'],
  '34': ['AI & Developer Tools', 'Technical Deep Dives', 'Productivity & Learning', 'Career Development'],
  '35': ['AI & Developer Tools', 'Developer Experience/DevRel', 'Career Development'],
  '36': ['AI & Developer Tools', 'Technical Deep Dives'],
  '37': ['Career Development', 'Non-traditional Paths to Tech', 'Developer Experience/DevRel', 'Leadership & Management'],
  '38': ['Productivity & Learning', 'Developer Experience/DevRel', 'Career Development'],
  '39': ['Developer Experience/DevRel', 'Career Development', 'Non-traditional Paths to Tech', 'Leadership & Management'],
  '40': ['Non-traditional Paths to Tech', 'Career Development', 'Leadership & Management'],
  '41': ['Technical Deep Dives', 'Open Source & GitHub', 'Career Development', 'Developer Experience/DevRel'],
  '42': ['Developer Experience/DevRel', 'Non-traditional Paths to Tech', 'Career Development', 'Productivity & Learning'],
  '43': ['Non-traditional Paths to Tech', 'Developer Experience/DevRel', 'Career Development', 'Productivity & Learning'],
};

/**
 * Get tags for a specific episode
 */
export function getEpisodeTags(episodeNumber: string | number): EpisodeTag[] {
  return episodeTags[String(episodeNumber)] || [];
}

/**
 * Get all episodes that have a specific tag
 */
export function getEpisodesByTag(tag: EpisodeTag): string[] {
  return Object.entries(episodeTags)
    .filter(([_, tags]) => tags.includes(tag))
    .map(([episodeNumber]) => episodeNumber);
}

/**
 * Get all unique tags used across all episodes
 */
export function getAllUsedTags(): EpisodeTag[] {
  const usedTags = new Set<EpisodeTag>();
  Object.values(episodeTags).forEach(tags => {
    tags.forEach(tag => usedTags.add(tag));
  });
  return Array.from(usedTags);
}
