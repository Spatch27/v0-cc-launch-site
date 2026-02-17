# Prismic CMS Setup Guide

## Step 1: Create Your Prismic Repository

1. Go to [prismic.io](https://prismic.io) and sign up or log in
2. Create a new repository named `cc-launch-site`
3. Choose the "Blank" starter

## Step 2: Add the Custom Type

1. In your Prismic dashboard, go to **Custom Types**
2. Click **Create Custom Type**
3. Choose **Repeatable Type**
4. Name it `insight_article` (use this exact name)
5. Click on the **JSON Editor** tab
6. Copy the entire contents of `customtypes/insight_article/index.json` from this project
7. Paste it into the JSON editor
8. Click **Save**

## Step 3: Add Test Articles

For each article, create a new document:

1. Go to **Documents** in the Prismic dashboard
2. Click **Create new** → **Insight Article**
3. Fill in the fields with the test data below
4. Click **Save** then **Publish**

### Article 1: Freedom from Operational Drag

- **UID**: `freedom-from-operational-drag`
- **Title**: Freedom from operational drag
- **Excerpt**: How removing friction unlocks marketing velocity and enables teams to focus on what truly matters.
- **Category**: What we're creating
- **Publication Date**: 2024-02-15
- **Read Time**: 8 min
- **Featured Image**: Upload an image or use a placeholder
- **Body**: (Copy the rich text content from below)
- **SEO Title**: Freedom from Operational Drag | Committed Citizens
- **SEO Description**: Discover how removing operational friction transforms marketing teams and unlocks true velocity.

**Body Content:**

## The Hidden Cost of Operational Drag

Most marketing teams spend more time managing work than doing work. The constant context switching, tool sprawl, and approval bottlenecks create an invisible tax on productivity.

We call this operational drag—the accumulated friction that slows down marketing velocity and prevents teams from reaching their full potential.

## What Changes When You Remove the Drag

When operational friction disappears, marketing teams transform. Decision-making accelerates. Creative energy flows to where it matters. Teams start shipping work that moves the needle.

The shift isn't just about efficiency—it's about unlocking the strategic capacity that gets buried under operational noise.

---

### Article 2: The Product Team Model

- **UID**: `the-product-team-model`
- **Title**: The product team model for marketing
- **Excerpt**: Why marketing should operate like product teams—and how to make the transition.
- **Category**: What we're creating
- **Publication Date**: 2024-01-28
- **Read Time**: 6 min
- **Featured Image**: Upload an image or use a placeholder
- **Body**: (Copy the rich text content from below)
- **SEO Title**: Product Team Model for Marketing | Committed Citizens
- **SEO Description**: Learn how applying product team principles transforms marketing operations and drives better outcomes.

**Body Content:**

## From Campaigns to Continuous Delivery

Traditional marketing organizes around campaigns—discrete projects with clear start and end dates. But modern marketing demands continuous iteration, experimentation, and optimization.

Product teams have solved this problem. They ship value continuously, iterate based on data, and maintain momentum without the stop-start nature of campaigns.

## The Five Principles

1. Cross-functional by default
2. Outcome-driven, not output-driven
3. Iterative over perfect
4. Data-informed decision making
5. Sustainable pace over sprints

---

### Article 3: Atomic Habits Review

- **UID**: `atomic-habits-for-teams`
- **Title**: Atomic Habits by James Clear
- **Excerpt**: Essential reading on how small changes compound into remarkable results—applicable to both personal and team transformation.
- **Category**: What we're consuming
- **Publication Date**: 2024-01-10
- **Read Time**: 4 min
- **Featured Image**: Upload an image or use a placeholder
- **Body**: (Copy the rich text content from below)
- **SEO Title**: Atomic Habits for Marketing Teams | Committed Citizens
- **SEO Description**: How James Clear's Atomic Habits framework applies to building better marketing operations.

**Body Content:**

James Clear's "Atomic Habits" isn't just another self-help book—it's a practical framework for understanding how systems shape behavior, and how tiny adjustments compound into transformative change.

## Why It Matters for Marketing Teams

The principles Clear outlines apply directly to marketing operations. Instead of chasing dramatic overhauls, focus on the 1% improvements in daily workflows, decision-making processes, and team rituals.

The compound effect of better habits—better meetings, clearer briefs, tighter feedback loops—creates the foundation for sustained high performance.

---

## Step 4: Get Your API Access Token

1. In Prismic, go to **Settings** → **API & Security**
2. Generate a **Permanent Access Token** for the repository
3. Add it to your environment variables:

```bash
# .env.local
PRISMIC_ACCESS_TOKEN=your_token_here
```

## Step 5: Test the Integration

1. Run your development server: `npm run dev`
2. Visit `http://localhost:3000/insights`
3. You should see your test articles listed
4. Click on an article to view its detail page

## Troubleshooting

**Articles not showing up?**
- Verify articles are published (not just saved as drafts)
- Check your `PRISMIC_ACCESS_TOKEN` is set correctly
- Ensure the repository name in `lib/prismicio.ts` matches: `cc-launch-site`

**Images not loading?**
- Make sure you've uploaded featured images in Prismic
- Check the image field is filled for each article
- Verify the image URLs are accessible

**Category filter not working?**
- Ensure you selected a category from the dropdown (not typed text)
- Check the exact spelling matches: "What we're creating" or "What we're consuming"
