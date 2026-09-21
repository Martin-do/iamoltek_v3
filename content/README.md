# Adding posts to the Initiative page

Daily reflections live in `content/posts/`. **Adding one never means editing code.**
Each post is a folder with a text file and a picture:

```
content/posts/post-21/
  post.md      the caption text and a few settings
  image.jpg    the poster (image.png or image.webp also work)
```

## The quick way

```bash
npm run new-post -- "Forward & Unstoppable" 2026-10-02 "C:\path\to\poster.jpg"
```

That creates the next numbered folder (`post-21`, `post-22`, ...), copies the poster in
and leaves a template. The date and the image path are optional. Then:

1. Open the new `post.md` and write the caption.
2. Delete the line `draft: true` when it is ready.
3. Commit and push to `main`. The site deploys itself.

## What post.md looks like

```
---
series: Forward & Unstoppable
publishAt: 2026-10-02
---

First paragraph.

Second paragraph.

“The quote goes in its own paragraph.”

#Hashtags #GoAtTheEnd
```

Settings (between the two `---` lines):

| Setting | Meaning |
|---|---|
| `series` | Required. The heading line shown above the text, for example `Rise & Believe`. |
| `publishAt` | Optional. `YYYY-MM-DD`. The post appears on that day (Lagos time). Leave it out to publish immediately. |
| `draft` | Optional. `draft: true` keeps the post hidden until you remove the line. |

Below the settings, **every blank line starts a new paragraph**. Lines with no blank line
between them stay together in one paragraph.

## Scheduling a week ahead

Give each post its own `publishAt` date and push them all at once. Each one appears on its
day with no rebuild, no server and no action from you. The newest published post is the
one the popup opens with, and the one the floating bubble shows.

One thing to know: scheduled posts are packed into the site's files ahead of time, so a
determined visitor could find an unpublished poster by digging through them. Fine for
posts that are already on Instagram, not for anything secret.

## Checks

`npm run validate` checks every post: folder name, one image, a real date, a series, some
text. The same check runs at the start of every `npm run build` and on every GitHub
branch, so a typo is caught before it reaches the live site, with a message saying which
folder and what is wrong.

## Pictures

Drop in the original, even a 4 MB one. It is resized to at most 1080px wide and saved as
WebP automatically (a 4 MB poster becomes about 100 KB). The original stays untouched.

## Where things show up

- The popup on the Initiative page and its floating bubble (newest post)
- "Latest from the Initiative" on the Initiative page (newest four)
- `/initiative/posts`, the archive of every published post. A link such as
  `/initiative/posts#post-17` opens that post directly, so it can be shared.

## Current drafts

`post-18`, `post-19` and `post-20` are ready and marked `draft: true`. Removing that line
(or giving them a `publishAt` date) publishes them.

The poster for Day 21 is still in `posts/theoyewaleareoyeinitiative_21.jpg`. It carries a
different quote from the two versions of the closing caption in `posts/initiative_total.txt`,
so the caption for it still needs to be written or chosen.

## Outreach reports and projects

Field reports (the food relief outreach, Back to School) are a different shape of content
with their own fields: locations, figures, photo galleries. They live in
`src/data/reportsData.js`, and each campaign has a `status` of `completed` or `ongoing`.
New report pages get their own share-preview image and search entry automatically.
