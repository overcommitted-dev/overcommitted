import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb: 'Overcommitted brings you software engineers who are genuinely passionate about their craft, discussing the technical decisions, learning strategies, and career challenges that matter.',
  description:
    'Overcommitted is where passion for the craft meets real talk about software engineering—from pull request philosophy and technical debt strategy to imposter syndrome and continuous learning, we are engineers committed to growing together and sharing the honest, thoughtful conversations that make you better at your job and your life.',
  hosts: [
    {
      name: 'Bethany Janos',
      bio: 'software engineer at GitHub, semi-professional dogspotter, free carbs are my favorite food',
      img: 'https://github.com/bethanyj28.png',
      github: 'https://github.com/bethanyj28',
      bluesky: 'https://bsky.app/profile/trustyduck.bsky.social',
    },
    {
      name: 'Brittany Ellich',
      bio: 'Senior All-End Engineer at GitHub, not the most technical one in the room',
      img: 'https://github.com/brittanyellich.png',
      github: 'https://github.com/brittanyellich',
      bluesky: 'https://bsky.app/profile/brittanyellich.com',
      website: 'https://brittanyellich.com',
    },
    {
      name: 'Eggyhead',
      bio: 'Software Engineer at GitHub',
      img: 'https://github.com/eggyhead.png',
      github: 'https://github.com/eggyhead',
      bluesky: 'https://bsky.app/profile/eggyhead-dev.bsky.social',
    },
    {
      name: 'Jonathan Tamsut',
      bio: 'Software Engineer at GitHub',
      img: 'https://github.com/jtamsut.png',
      github: 'https://github.com/jtamsut',
      website: 'https://jtamsut.substack.com',
      bluesky: 'https://bsky.app/profile/jetmin.bsky.social',
    }
  ],
  platforms: {
    apple:
      'https://podcasts.apple.com/us/podcast/overcommitted/id1804549260',
    appleIdNumber: '1804549260',
    spotify: 'https://open.spotify.com/show/2QOeTxNTB5ouehOGpAJex7',
    youtube: 'https://www.youtube.com/playlist?list=PLtB6jHdGNyzd-GiAjcBjUXiuFxWeDwjjJ',
    amazonMusic: 'https://music.amazon.com/podcasts/2199a9bb-b763-4bf4-b4ec-47e544d8a099/overcommitted',
    bluesky: 'https://bsky.app/profile/overcommitted.dev',
  },
  rssFeed: 'https://anchor.fm/s/102586d64/podcast/rss'
});