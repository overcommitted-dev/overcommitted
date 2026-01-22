import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb: 'Overcommitted brings you software engineers who are genuinely passionate about their craft, discussing the technical decisions, learning strategies, and career challenges that matter.',
  description:
    'Overcommitted is where passion for the craft meets real talk about software engineering—from pull request philosophy and technical debt strategy to imposter syndrome and continuous learning, we are engineers committed to growing together and sharing the honest, thoughtful conversations that make you better at your job and your life.',
  hosts: [
    {
      name: 'Bethany Janos',
      bio: 'Bethany is a software engineer at GitHub on the Copilot API team who studied biomedical engineering in college before discovering her love for programming. She\'s passionate about authentic technical communication, challenging assumptions about identity in tech, and creating welcoming environments where engineers can grow without sacrificing who they are.',
      img: 'https://github.com/bethanyj28.png',
      github: 'https://github.com/bethanyj28',
      bluesky: 'https://bsky.app/profile/trustyduck.bsky.social',
    },
    {
      name: 'Brittany Ellich',
      bio: 'Brittany is a software engineer at GitHub working on the billing team, where she champions accessibility, documentation, and engineering mentorship programs. As a career changer who\'s been in tech for several years, she\'s passionate about building authentic engineering communities and helping developers navigate the real challenges of technical debt, career sustainability, and work-life balance.',
      img: 'https://github.com/brittanyellich.png',
      github: 'https://github.com/brittanyellich',
      bluesky: 'https://bsky.app/profile/brittanyellich.com',
      website: 'https://brittanyellich.com',
    },
    {
      name: 'Eggyhead (Erika)',
      bio: 'Erika is a software engineer at GitHub on the authorization team and a career changer who brings fresh perspectives to imposter syndrome, goal-setting, and collaborative engineering. She\'s deeply interested in learning, building supportive developer communities, and helping engineers measure success on their own terms.',
      img: 'https://github.com/eggyhead.png',
      github: 'https://github.com/eggyhead',
      bluesky: 'https://bsky.app/profile/eggyhead-dev.bsky.social',
    },
    {
      name: 'Jonathan Tamsut (Former Host)',
      bio: 'Jonathan is a former software engineer at GitHub and co-founder of Overcommitted who studied chemistry in college before transitioning to tech. He brought thoughtful perspectives on imposter syndrome, personal branding, and the deeper psychological aspects of engineering careers, helping shape the podcast\'s honest conversations about developer life.',
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