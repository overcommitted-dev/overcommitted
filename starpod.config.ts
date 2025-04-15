import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb: 'A collection of overcommitted overachievers discuss what it takes to be developers.',
  description:
    'Bethany, Brittany, Erika, and Jon are software engineers at GitHub that have banded together due to a shared love of doing lots of things. They get together weekly to discuss software engineering.',
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
    amazonMusic: 'https://music.amazon.com/podcasts/2199a9bb-b763-4bf4-b4ec-47e544d8a099/overcommitted'
  },
  rssFeed: 'https://anchor.fm/s/102586d64/podcast/rss'
});