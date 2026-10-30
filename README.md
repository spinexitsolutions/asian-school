# The Asian International School, Chomu: Website + Admin Panel

Public website and content management system (CMS) for The Asian International School, Chomu (Jaipur).

- **Website:** Next.js 16 (React), Tailwind CSS v4
- **Admin panel / CMS:** custom-built admin panel at `/admin` (login, roles, editor, uploads), same app
- **Database:** MongoDB Atlas (free M0 cluster)
- **Images & PDFs:** Cloudinary (free plan), or the `uploads/` folder on the server when Cloudinary isn't configured
- **Hosting:** Hostinger Business Web Hosting (Node.js app)

## What staff can edit in `/admin`

| Section | What it controls |
| --- | --- |
| **Inbox → Enquiries** | Admission and contact form submissions. **Download all as Excel (CSV)** button at the top. |
| **Updates → Notices** | Notice Board: date, category, optional PDF. "Pinned" shows it on the homepage. |
| **Updates → News & Events** | Posts with cover photo, rich text and draft/publish. |
| **Updates → Gallery** | Photo albums (multi-upload, reorder, first photo = cover) and YouTube videos. |
| **Updates → Media Library** | Every uploaded photo/PDF, drag & drop upload, copy link. |
| **School → Faculty / Achievers & Toppers / Testimonials / Facilities / Job Openings** | The matching website sections. Tick **Show in homepage hero** and set **Rank** 1–3 on toppers for the homepage Board Toppers panel. |
| **CBSE Corner → Transfer Certificates** | Upload TCs. Parents search them by admission number at `/transfer-certificates`. |
| **Pages → Home / About / Academics / Admissions** | All text, numbers, photos, Director's message, calendar, fee PDF, FAQs. |
| **CBSE Corner → Mandatory Disclosure** | CBSE Appendix-IX tables, with document links. |
| **CBSE Corner → Extra Pages** | Any extra page at `/your-slug` (e.g. Information of the School, Affiliation Details). |
| **Settings → Site Settings** | Logo, phones, email, address, WhatsApp, Google Map, social links, **admission popup**, top-bar slogan, SEO. |
| **Settings → Staff Users** | Admin (everything) and Editor (content only) accounts. Only admins see this. |

The dashboard shows new enquiries, counts and quick actions. Each user can change their password under **My account** (click your name in the sidebar).

Changes appear on the website within seconds. While a section is still empty, the website shows
sample content (e.g. sample notices, "Topper Name") so no page looks blank.

## Run locally (no MongoDB Atlas needed)

Until the Atlas link is ready, the site uses a MongoDB database on your own computer.
If `DATABASE_URI` is empty it automatically connects to `mongodb://127.0.0.1:27017/asian-school`.

```bash
npm install
cp .env.example .env    # already points to the local database; just set AUTH_SECRET
```

**Terminal 1** starts a local MongoDB. Nothing extra to install: the first run downloads the
MongoDB server (~100 MB) once, and data is saved in the `.mongo-data` folder:

```bash
npm run db:local
```

**Terminal 2** starts the website:

```bash
npm run dev             # http://localhost:3000  and  http://localhost:3000/admin
```

Already have MongoDB Community Server installed and running? Skip `npm run db:local`, because it
uses the same port (27017).

On first visit to `/admin` you will be asked to create the first admin user. Creating it also loads the
school's starting content (settings, page text, sample notices/news/toppers) so everything is editable.

**Switching to Atlas later:** put the Atlas link in `DATABASE_URI` in `.env` (or in Hostinger's
environment variables) and restart. Local data is not copied automatically; run `npm run seed`
on the new database, or copy it with `mongodump` / `mongorestore`.

To load the starting content without the admin page (e.g. on a new database):

```bash
npm run seed
```

The seed only fills things that are still empty, so it is safe to run again.

## Deploy on Hostinger (step by step)

### 1. MongoDB Atlas (free)
1. Create an account at https://www.mongodb.com/cloud/atlas and create a **free M0 cluster** (region: Mumbai).
2. **Database Access:** add a user with a strong password.
3. **Network Access:** allow `0.0.0.0/0` (or Hostinger's server IP).
4. **Connect → Drivers:** copy the connection string and add `/asian-school` before the `?`. This is your `DATABASE_URI`.

### 2. Cloudinary (free, recommended)
1. Create an account at https://cloudinary.com.
2. From the dashboard copy **Cloud name, API key and API secret**.
   Uploaded photos/PDFs are then stored on Cloudinary, so they survive redeploys and load fast.

### 3. Hostinger
1. Buy **Business Web Hosting** (it includes Node.js apps) and connect your domain.
2. hPanel → **Websites → Add website → Node.js app**, and import this GitHub repository.
3. Settings:
   - Node version: **20 or 22**
   - Build command: `npm run build`
   - Start command: `npm start`
4. Add environment variables (from `.env.example`):
   `DATABASE_URI`, `AUTH_SECRET` (long random text), `NEXT_PUBLIC_SERVER_URL` (e.g. `https://asianschoolchomu.in`),
   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
5. Deploy. Then open `https://your-domain/admin` and create the admin account.
6. Optional email alerts for new enquiries: create a mailbox in Hostinger (e.g. `info@your-domain`) and set
   `SMTP_HOST=smtp.hostinger.com`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`.
   In Site Settings → Contact, set **notificationEmail**.

## Useful commands

```bash
npm run typecheck        # type-check
npm run build            # production build
```

## Project structure

```
src/
  app/(frontend)/      public website pages
  app/(admin)/admin/   admin panel (login, dashboard, lists, forms, server actions)
  app/api/admin/       upload, media library and Excel export endpoints
  app/media/           serves uploaded files (local storage mode)
  cms/schema.ts        every admin section and its fields — add a field here and it appears in the form
  components/          website UI; components/admin/ = admin UI
  content/defaults.ts  starting content and fallbacks
  lib/                 database, auth, uploads, data access, enquiry action
  proxy.ts             redirects logged-out visitors from /admin to the login page
  seed/                content seeding script
public/images/         logo, campus and director photos
```
