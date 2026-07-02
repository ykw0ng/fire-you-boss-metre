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

## Lead form / deployment note

The "Get the guide" form uses [Netlify Forms](https://docs.netlify.com/forms/setup/)
(`data-netlify="true"`). It captures submissions automatically **only when deployed on Netlify**.
On any other host (e.g. GitHub Pages) the form falls back to a client-side thank-you and does
**not** store the lead. To capture leads elsewhere, swap the form action for a service like
Formspree, Getform, or a custom endpoint.

Remember to update `site` in `astro.config.mjs` to your final domain.
