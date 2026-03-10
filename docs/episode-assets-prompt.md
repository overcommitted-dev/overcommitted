# Episode Assets Prompt

## Before You Run This Prompt

Make sure you have uploaded to the Claude conversation:

- [ ] Full episode transcript (downloaded from Riverside)
- [ ] Clip 1 transcript or SRT file
- [ ] Clip 2 transcript or SRT file

The Claude Project memory provides show context automatically — no need to re-explain the podcast.

---

## The Prompt
*(Copy everything in the code block and paste it into Claude after uploading your files)*

```
Episode Assets

I've uploaded the full episode transcript and two clip transcripts. Please generate the following:

---

FULL EPISODE

1. 3–5 episode title suggestions
2. YouTube keywords (500 characters or less)
3. LinkedIn post announcing the episode is out
4. Bluesky post announcing the episode is out

---

CLIP 1 — Release Day
This clip will be posted on the day the episode drops across YouTube Shorts, TikTok, LinkedIn, and Bluesky.

1. YouTube Shorts post copy — include "Episode just released today" or similar
2. TikTok post copy — include release day language and relevant hashtags
3. LinkedIn post copy
4. Bluesky post copy
5. YouTube keywords for the clip (500 characters or less)

---

CLIP 2 — Follow-Up (1–2 days post-release)
This clip will be posted a day or two after the episode to keep momentum going.

1. YouTube Shorts post copy — include "check out this week's episode" or similar
2. TikTok post copy — weekly episode reference + hashtags
3. LinkedIn post copy
4. Bluesky post copy
5. YouTube keywords for the clip (500 characters or less)

---

Please optimize everything for SEO and AI searchability so clips and episodes are easily surfaceable and shareable. Match each platform's tone per the project guidelines.
```

---

## Tips

- **TikTok auto-captions are gold** — after uploading Clip 1 and Clip 2 to TikTok Studio, copy the auto-generated captions and use them for LinkedIn and Bluesky posts too. Quality is consistently better than manually written captions.
- If an episode is ethics-focused or covers career development themes, call that out in the prompt — those topics over-index with the Overcommitted audience.
- YouTube keyword limit is strict — paste Claude's output into a character counter before uploading to YouTube Studio.

---

## Updating This Prompt

If the prompt needs to change (new platforms, new content types, format tweaks), update this file in the repo and then update the pinned message in the Claude Project. Tag the change in git with the episode number where the change was first used.
