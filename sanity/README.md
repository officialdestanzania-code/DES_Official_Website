# DES Partner CMS setup

The Butimba Partners pages use Sanity as the content management system. The embedded Sanity Studio is available at `/admin` after the Vercel project is connected.

## 1. Connect Sanity through Vercel Marketplace

Use the official [Sanity integration for Vercel](https://vercel.com/marketplace/sanity).

1. Install Sanity on the existing Vercel project **des-official-website**.
2. Choose either to create a new Sanity account/project through Vercel or link an existing Sanity account. Use the account that DES will retain and administer.
3. When asked for the environment-variable prefix, choose **`VITE_`**. This makes the public project settings available to the Vite frontend as `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`.
4. Choose the **Free** plan unless DES has separately approved a paid plan.
5. Apply the integration variables to **Preview and Production**. Keep the Sanity read/write tokens server-side secrets; never add `VITE_` to token names and never expose a write token in browser code.

The public partner directory uses a public-read dataset containing only information approved for publication. Do not store private pupil data, personal contact details or confidential school records there.

## 2. Sign-in, CORS and administrators

1. Open the Sanity integration dashboard in Vercel and use **Open in Sanity**.
2. In Sanity Account Settings, connect a Google or GitHub sign-in method. Use the account that owns the Vercel/Sanity project.
3. In the Sanity project API/CORS settings, add `https://des.co.tz` and the exact Vercel Preview origin. Enable authenticated requests for the Studio origins.
4. Invite each administrator individually through Sanity Manage. Assign the least-privileged role that permits them to create and publish partner, group and contribution records. Do not share one admin password.
5. Confirm the Vercel environment variables exist in Preview and Production. Trigger a Preview deployment after the integration finishes provisioning.

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

1. Open `https://des.co.tz/admin` and sign in to Sanity.
2. Create/select a **Partner group** (for example, Butimba Alumni Network).
3. Create a **Partner / Supporter** with a unique URL slug, group, category, summary, role and location.
4. If a person works under an organisation, set **Works under / affiliated with** to the organisation profile. Example: Thomas Barcatta is affiliated with Mwanza e.V.; do not record his coordination role as a separate organisational donation.
5. Create one or more **Contribution / Project Record** documents and link each to the correct supporter. Enter the year, contribution type, description, quantity if known, and the accurate status.
6. Add authentic photographs only after permission for public display is confirmed. Each gallery image needs alt text, a caption and the permission checkbox selected.
7. Preview the records and publish them. The public directory displays published content only. Each supporter receives a stable route at `/partners/<slug>`.

## 5. Publishing and search indexing

New profiles can load from the published CMS through the public partner directory. For new/updated pages to receive refreshed prerendered HTML and sitemap entries, create a Vercel Deploy Hook for the `main` branch and add it as a Sanity webhook for published partner, partner-group and contribution changes. Keep the Deploy Hook URL private. Do not expose it in `VITE_*` variables or commit it to Git.

## Security and operations

- `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` are public configuration; they are not secrets.
- Never put `SANITY_API_WRITE_TOKEN` or other write tokens into client-side environment variables.
- Public pages use published content; only authenticated Sanity users with project permissions can create, edit and publish records.
- Do not publish pupil names, personal phone numbers, identity documents, sensitive school records or images without the required permissions.
- Export a backup before bulk edits or imports.
