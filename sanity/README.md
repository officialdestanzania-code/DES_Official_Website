# DES Content Studio setup

The DES Official Website uses Sanity for its editorial News & Updates and the Butimba Partners & Contributions directory. The embedded Sanity Studio is available at `/admin` after the Vercel project is connected.

## 1. Connect Sanity through Vercel Marketplace

Use the official [Sanity integration for Vercel](https://vercel.com/marketplace/sanity).

1. Install Sanity on the existing Vercel project **des-official-website**.
2. Choose either to create a new Sanity account/project through Vercel or link an existing Sanity account. Use the account that DES will retain and administer.
3. For this Vite application, enter **`VITE`** as the Custom Prefix (without a trailing underscore). Vercel validates the prefix and inserts the separator when generating variable names.
4. Choose the **Free** plan unless DES has separately approved a paid plan.
5. Connect **Preview** first. Add Production only after the Preview deployment, Admin sign-in, and published partner content have been tested and approved.

The Sanity integration provisions separate API and Studio settings. The Vite app reads:
- `VITE_SANITY_API_PROJECT_ID`
- `VITE_SANITY_API_DATASET`
- `VITE_SANITY_STUDIO_PROJECT_ID`
- `VITE_SANITY_STUDIO_DATASET`

The integration may also create framework-specific `NEXT_PUBLIC_VITE_SANITY_*` variables. This Vite + React app does not use those Next.js variables.

The integration also provisions read/write token values. Treat those as server-side secrets. Never read token variables through `import.meta.env`, pass them into a browser-side Sanity client, or include them in client bundles. The public partner directory only queries published content from the public-read dataset and does not need an API token.

The public partner directory uses a public-read dataset containing only information approved for publication. Do not store private pupil data, personal contact details or confidential school records there.

## 2. Sign-in, CORS and administrators

1. Open the Sanity integration dashboard in Vercel and use **Open in Sanity**.
2. In Sanity Account Settings, connect a Google or GitHub sign-in method. Use the account that owns the Vercel/Sanity project.
3. In the Sanity project API/CORS settings, add `https://des.co.tz` and the exact Vercel Preview origin. Enable authenticated requests for the Studio origins.
4. Invite each administrator individually through Sanity Manage. Assign the least-privileged role that permits them to create and publish partner, group and contribution records. Do not share one admin password.
5. Confirm the expected environment variables exist in Preview. Trigger a new Preview deployment after the integration finishes provisioning.

## 3. Import the initial Butimba records

From a trusted computer with Node.js 22.12 or later:

```bash
npx sanity@latest login
npx sanity@latest dataset import sanity/initial-data.ndjson production
```

The NDJSON file contains 18 initial documents:
- 3 partner groups.
- 7 partner profiles.
- 8 contribution records.

Import this seed file **once** into the empty `production` dataset. It records the existing Butimba project history, including Herman Tanguye's photocopy machine and 2026 school Wi-Fi, Samwel Tanguye's 15 staff-room chairs, and Dr. Ancyfrida Prosper's paused girls' menstrual hygiene room initiative.

## 4. Adding a partner or contribution

1. Open the Preview deployment's `/admin` route and sign in to Sanity.
2. Create/select a **Partner group** (for example, Butimba Alumni Network).
3. Create a **Partner / Supporter** with a unique URL slug, group, category, summary, role and location.
4. If a person works under an organisation, set **Works under / affiliated with** to the organisation profile. Example: Thomas Barcatta is affiliated with Mwanza e.V.; do not record his coordination role as a separate organisational donation.
5. Create one or more **Contribution / Project Record** documents and link each to the correct supporter. Enter the year, contribution type, description, quantity if known, and the accurate status.
6. Add authentic photographs only after permission for public display is confirmed. Each gallery image needs alt text, a caption and the permission checkbox selected.
7. Preview the records and publish them. The public directory displays published content only. Each supporter receives a stable route at `/partners/<slug>`.

## 5. Publishing a News & Update article

1. Open `/admin` on the approved Preview deployment and sign in with your individual Sanity account.
2. Create a **News & Update** document.
3. Add a clear headline, URL slug, category, short summary and publication date/time. Use the actual date of the announcement or activity; do not backdate or invent dates.
4. Add a cover image, descriptive alternative text and photo credit where appropriate. Confirm permission for public display before publishing an image.
5. Write the article body using headings, paragraphs, quotations, lists and links. For factual project updates, add supporting references under **Supporting references / source links**.
6. Add relevant search tags and optional SEO title/description. Keep the headline factual and avoid exaggerated claims.
7. Preview the article, check spelling, names, dates, quantities and links, then publish it. Drafts and future-dated articles are not displayed publicly.
8. The public routes are `/news` and `/news/<slug>`. The homepage shows the latest three published articles.

Do not publish pupil names, personal contact details, identity documents, confidential school records or photographs without the required public-display permission. Use only verified project information and retain source links for material factual claims.

## 6. Publishing and search indexing

New profiles can load from the published CMS through the public partner directory. For new/updated pages to receive refreshed prerendered HTML and sitemap entries, create a Vercel Deploy Hook for the production branch `release/butimba-partners-records-2026` and add it as a Sanity webhook for published newsArticle, partner, partnerGroup and contribution changes. Keep the Deploy Hook URL private. Do not expose it in `VITE_*` variables or commit it to Git.

## 7. Security and operations

- Sanity project IDs and dataset names are public configuration; they are not secrets.
- Never put `SANITY_API_WRITE_TOKEN` or other write tokens into client-side environment values or browser code.
- Public pages use published content; only authenticated Sanity users with project permissions can create, edit and publish records.
- Do not publish pupil names, personal phone numbers, identity documents, sensitive school records or images without the required permissions.
- Export a backup before bulk edits or imports.
