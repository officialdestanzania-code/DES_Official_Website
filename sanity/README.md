# DES Partner CMS setup

The Butimba Partners pages use Sanity as the content management system. Sanity Studio is available at `/admin` after the project is connected.

## Content model

- **Partner groups** organise supporters (for example, International Technology Partners, Friends of Butimba Primary School and Butimba Alumni Network).
- **Partners** represent an organisation or individual and have their own public slug/profile URL.
- **Contributions** are separate records linked to a partner. Each contribution has a year, category, quantity (optional), status, description, photographs and references.
- **Affiliation** connects a person to an organisation. Thomas Barcatta is affiliated with Mwanza e.V.; he is not represented as an independent donating organisation.
- **Gallery images** are published only when the administrator confirms permission for public display.

## One-time project connection

1. Create a Sanity project and a public-read dataset named `production` in Sanity Manage.
2. In Vercel, add these environment variables to **Preview** and **Production**:
   - `VITE_SANITY_PROJECT_ID`: the Sanity project ID (public identifier, not a secret).
   - `VITE_SANITY_DATASET`: `production`.
3. In Sanity Manage, open API / CORS origins and add the actual origins used by the site, including `https://des.co.tz` and the current Vercel Preview origin. Enable authenticated requests for the Studio origin.
4. Invite each approved administrator individually in Sanity Manage. Assign only the role they need. Do not share a single admin login.
5. From the repository root, authenticate with the Sanity CLI and import the starting records:
   ```bash
   npx sanity@latest login
   npx sanity@latest dataset import sanity/initial-data.ndjson production
   ```
   The NDJSON file contains the three partner groups, seven partner profiles and eight contribution records currently recorded for Butimba.
6. Redeploy the Vercel Preview after setting the environment variables. Confirm `/admin` opens Sanity Studio, and test creating a draft partner and contribution before publishing.

## Adding a new supporter

1. In `/admin`, create or select the relevant **Partner group**.
2. Create a **Partner / Supporter**. Set the name, URL slug, group, role, short description and location.
3. For a person working under an organisation, set **Works under / affiliated with** to that organisation's partner profile. Do not create a duplicate organisation record.
4. Create one or more **Contribution / Project Record** documents and link each to the correct contributor. Enter the year, category, quantity where applicable, and accurate status.
5. Add photographs only when the school has permission for public display. For each image, provide alt text and caption, then confirm the permission checkbox.
6. Preview the draft, then publish. Published partner records appear on the public directory and their profile URLs use `/partners/<slug>`.

## Security and publishing

- The project ID and dataset name are public configuration; never add an API write token to a `VITE_*` variable or commit a secret.
- Public pages use read-only published content. Create, edit, publish and upload actions require an authenticated Sanity account with the right project role.
- Do not store private pupil information, personal phone numbers, identity documents or confidential school records in public partner profiles.
- Keep an export backup before bulk changes or migrations.
- A CMS connection is not active until the project ID/dataset and CORS origins have been configured in Sanity and Vercel.
