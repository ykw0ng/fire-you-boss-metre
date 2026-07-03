# Fire Your Boss Metre

A standalone one-page [Astro](https://astro.build) site: a financial-independence calculator
that shows how much invested capital you need to stop working on your terms, and how close
you already are. Built for Kang's coaching practice.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs static site to ./dist
npm run preview  # preview the production build
```

## How the calculation works

Inputs: current age, current yearly expenses, current liquid assets, target "fire" age.

Assumptions: **3% inflation**, **5% investment return**, lifestyle funded to **age 87**.

1. Today's expenses are grown by inflation to the fire age → first-year retirement spend.
2. **Required nest egg at fire age** = present value of a growing annuity-due (withdrawals
   rising 3%/yr, discounted at 5%) across the years from the fire age to 87.
3. **Projected assets** = today's liquid assets grown at 5% to the fire age.
4. **Metre %** = projected ÷ required. If short, it shows the monthly investment needed to close the gap.

Illustration only — not financial advice.

## Lead form (Google Forms)

The "Get the guide" form posts submissions into a **Google Form** — responses land in its
linked **Google Sheet** (and you can turn on per-response email notifications there). No
backend of your own is needed, so it works on any static host including Cloudflare Pages.

**Setup (one time):**

1. Create a Google Form with these questions: **Name**, **Contact number**, **Email**, and
   (optional) a short-answer **Metre result**.
2. Open the form's **⋮ menu → Get pre-filled link**, type any dummy answers, click **Get link**,
   and copy it. The link contains each field's ID, e.g. `entry.123456789=John`.
3. In `src/pages/index.astro`, find the `GOOGLE_FORM` object and fill in:
   - `action`: replace `FORM_ID` with the code from your form URL
     (`/forms/d/e/FORM_ID/viewform`).
   - `fields`: paste each `entry.NNN` ID (drop the `metre` line if you skipped that question).
4. Commit and push — Cloudflare redeploys automatically.

Spam is blocked by the hidden `botcheck` honeypot. Until `FORM_ID` is set, the form just shows
the on-page thank-you and stores nothing. Because Google Forms sends no CORS headers, the site
submits "no-cors" and optimistically shows the thank-you; a network failure shows a retry error.

Quickest alternative: if you'd rather not wire up field IDs, you can instead link the button
straight to your Google Form's public URL (opens in a new tab) — simpler, but it leaves the page.

## Deploy on Cloudflare Pages

Connect this GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Pages →
Connect to Git) with:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Every push to `main` triggers a deploy. Remember to update `site` in `astro.config.mjs`
to your final domain (used for canonical URLs / SEO).
