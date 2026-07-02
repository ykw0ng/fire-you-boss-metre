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

## Lead form (Web3Forms)

The "Get the guide" form posts to [Web3Forms](https://web3forms.com), which emails each
submission (name, phone, email, and the visitor's metre result) to you. No backend required,
so it works on any static host including Cloudflare Pages.

**Setup (one time):**

1. Go to https://web3forms.com and enter the email address where you want leads delivered.
2. They email you an **access key**.
3. In `src/pages/index.astro`, find `YOUR_WEB3FORMS_ACCESS_KEY` and replace it with your key.
4. Commit and push — Cloudflare redeploys automatically.

The access key is safe to keep in the public repo; spam is blocked by the hidden `botcheck`
honeypot. Until a real key is set, the form just shows the on-page thank-you and stores nothing.

## Deploy on Cloudflare Pages

Connect this GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Pages →
Connect to Git) with:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

Every push to `main` triggers a deploy. Remember to update `site` in `astro.config.mjs`
to your final domain (used for canonical URLs / SEO).
