import { defineDb, defineTable, column } from 'astro:db';

const Episode = defineTable({
  columns: {
    episodeSlug: column.text({ primaryKey: true })
  }
});

const Person = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    img: column.text({ optional: true }),
    name: column.text()
  }
});

const HostOrGuest = defineTable({
  columns: {
    episodeSlug: column.text({
      references: () => Episode.columns.episodeSlug
    }),
    isHost: column.boolean(),
    personId: column.text({ references: () => Person.columns.id })
  },
  indexes: [{ on: ['episodeSlug', 'personId'], unique: true }]
});

const Sponsor = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    img: column.text({ optional: true }),
    name: column.text(),
    url: column.text()
  }
});

const SponsorForEpisode = defineTable({
  columns: {
    episodeSlug: column.text({
      references: () => Episode.columns.episodeSlug
    }),
    sponsorId: column.text({ references: () => Sponsor.columns.id })
  },
  indexes: [{ on: ['episodeSlug', 'sponsorId'], unique: true }]
});

export default defineDb({
  tables: { Episode, HostOrGuest, Person, Sponsor, SponsorForEpisode }
});
