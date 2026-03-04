# 🏫 School Basic Template

A modern, responsive school website template built with **Next.js 16**, **Tailwind CSS v4**, **Framer Motion**, and **Firebase**. Features a complete public-facing website with an admin dashboard for content management.

---

## ✨ Features

### Public Website
- **Home** — Hero slider, announcements bar, latest news, upcoming events, stats counter, testimonials
- **About** — Mission/vision, core values, school history timeline
- **Academics** — Programs list (Pre-Primary to Senior Secondary), facilities grid
- **Blog** — News articles with categories, reading time, full detail pages
- **Events** — School events with auto-computed status (upcoming/ongoing/past)
- **Gallery** — Photo albums with lightbox viewer
- **Announcements** — Pinned announcements with category badges
- **FAQ** — Grouped by category with animated accordions
- **Contact** — Contact form with validation, embedded Google Map

### Admin Dashboard
- **Dashboard** — Content counts, quick action links
- **Hero Slides** — CRUD management for homepage slider
- **Announcements** — Create/edit announcements with rich text
- **Blog Posts** — Rich text editor (TipTap), drafts & publish workflow
- **Events** — Full event management with dates, venues, categories
- **Gallery** — Album management with cover images
- **FAQ** — Question/answer management with ordering
- **Messages** — View/reply contact form submissions
- **Pages** — Edit static page content with rich text editor
- **Media Library** — Upload and manage images
- **Settings** — School info, contact details, social media links

### Technical Highlights
- ⚡ **Next.js 16** App Router with Turbopack & React Compiler
- 🎨 **Tailwind CSS v4** with CSS-based design tokens & dark mode
- 🎬 **Framer Motion 12** scroll animations & page transitions
- 🔥 **Firebase** Auth, Firestore, Storage
- 📱 Fully responsive design
- ♿ Accessible components
- 🔒 Admin auth with custom claims & session cookies
- 🚀 Vercel-ready deployment

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm or yarn
- A Firebase project (free tier works)

### 1. Clone & Install

```bash
cd school-basic-template
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication** → Email/Password provider
4. Enable **Cloud Firestore** → Start in test mode
5. Enable **Storage** → Start in test mode
6. Go to **Project Settings** → General → Your apps → Add Web app
7. Copy the Firebase config values

### 3. Firebase Service Account

1. Go to **Project Settings** → Service Accounts
2. Click **Generate New Private Key**
3. Stringify the JSON and use as `FIREBASE_SERVICE_ACCOUNT_KEY`

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

**Required Firebase variables:**
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Stringified service account JSON |

**School identity & contact:**
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SCHOOL_NAME` | School display name |
| `NEXT_PUBLIC_SCHOOL_TAGLINE` | School tagline/motto |
| `NEXT_PUBLIC_SCHOOL_EMAIL` | Contact email |
| `NEXT_PUBLIC_SCHOOL_PHONE` | Contact phone |
| `NEXT_PUBLIC_SCHOOL_ADDRESS` | Physical address |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | Google Maps embed URL |

See `.env.example` for the complete list.

### 5. Set Admin User

First, create a user account by visiting `/admin/login` (the sign-in will fail initially). Then run:

```bash
npx tsx scripts/set-admin.ts admin@yourschool.com
```

The user must sign out and back in for the admin claim to take effect.

### 6. Deploy Firebase Rules

```bash
npx firebase deploy --only firestore:rules,storage
```

### 7. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## 📁 Project Structure

```
school-basic-template/
├── public/                    # Static assets
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── set-admin.ts           # Firebase admin claim script
├── src/
│   ├── app/
│   │   ├── (public)/          # Public website pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── academics/
│   │   │   ├── blog/
│   │   │   ├── events/
│   │   │   ├── gallery/
│   │   │   ├── announcements/
│   │   │   ├── faq/
│   │   │   └── contact/
│   │   ├── admin/
│   │   │   ├── login/         # Admin login
│   │   │   └── (dashboard)/   # Protected admin pages
│   │   │       ├── page.tsx   # Dashboard
│   │   │       ├── hero-slides/
│   │   │       ├── announcements/
│   │   │       ├── blog/
│   │   │       ├── events/
│   │   │       ├── gallery/
│   │   │       ├── faq/
│   │   │       ├── messages/
│   │   │       ├── pages/
│   │   │       ├── media/
│   │   │       └── settings/
│   │   └── api/               # API routes
│   │       ├── contact/
│   │       ├── revalidate/
│   │       └── admin/verify/
│   ├── components/
│   │   ├── ui/                # 17 primitive UI components
│   │   ├── shared/            # Logo, ThemeToggle, etc.
│   │   ├── public/            # Public site components
│   │   └── admin/             # Admin dashboard components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utils, Firebase, constants
│   ├── providers/             # Context providers
│   └── types/                 # TypeScript interfaces
├── firestore.rules            # Firestore security rules
├── storage.rules              # Storage security rules
├── firebase.json              # Firebase config
└── vercel.json                # Vercel deployment config
```

---

## 🚢 Deployment (Vercel)

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local` to Vercel's Environment Variables
4. Deploy!

For on-demand revalidation after content changes, the admin dashboard automatically triggers `/api/revalidate`.

---

## 🎨 Customization

### Colors
Edit the `@theme` block in `src/app/globals.css` to change the color palette. The design system uses CSS custom properties:
- `--color-primary-*` — Primary brand color (default: blue)
- `--color-secondary-*` — Secondary accent (default: purple)
- Neutral surface/text/border tokens auto-adapt to light/dark mode

### Fonts
Change the font in `src/app/layout.tsx` (currently uses Inter from Google Fonts).

### Content
All content is managed through the admin dashboard. No code changes needed for day-to-day updates.

---

## 📜 License

This template is proprietary. Unauthorized redistribution is prohibited.

---

Built with ❤️ for educational institutions.
