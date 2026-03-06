---
name: blog-writer
description: Creates SEO-optimized, GEO-ready blog posts for the AIWebHub blog with E-E-A-T signals, structured for AI search citability. Use when user says "write a blog", "create blog post", "new blog article", "blog about", "write an article", "content marketing", "publish a post", "add to blog", "SEO content", "write content for the website", or asks to add any written content to the blog section. Handles keyword research, content gap analysis, content structuring with varied post archetypes, and natural internal referencing. Always use this skill for blog-related content creation, even if the user doesn't explicitly say "blog" — if they want to publish written content on the site, this is the skill.
---

# Blog Writer

Creates high-quality, SEO-optimized blog posts designed to rank in traditional search and get cited by AI search engines (ChatGPT, Perplexity, Google AI Overviews).

## When Activated

1. Read the project's blog data file (`lib/blog-posts.ts`) to understand the existing interface, author info, tags, and content style
2. Read 1-2 existing blog posts to match voice, structure, and depth
3. Follow the workflow below

## Renderer Constraints

The blog renderer (`app/blog/[slug]/page.tsx`) is a simple custom parser. Understanding its limits is essential because using unsupported syntax produces broken output where raw markdown characters appear on the page.

**What renders correctly:**
- `## Heading` — splits the post into titled sections (the only heading level supported)
- Plain text paragraphs separated by blank lines (`\n\n`)

**What does NOT render (appears as raw text on the page):**
- `###` or deeper headings — the `###` characters appear literally
- `**bold**` or `*italic*` — asterisks appear literally
- `[link text](url)` — the entire bracket/parenthesis syntax appears literally
- `- ` bullet lists — dashes appear as text, not styled list items
- `1. ` numbered lists — same issue
- `| table |` syntax — pipe characters appear literally
- `` `code` `` — backticks appear literally
- `> blockquotes` — the `>` character appears literally

**How to handle internal references** (instead of markdown links):
Mention pages naturally in prose. Examples:
- "Visit aiwebhub.io/services for detailed pricing on all plans"
- "As we covered in our guide to website costs, pricing varies by project scope"
- "Contact us at aiwebhub.io/contact to discuss your project"

**How to handle list-like content** (instead of bullet points):
Write each point as its own short paragraph separated by a blank line. Start each with a clear topic phrase so the structure is scannable even without bullet formatting.

**How to handle comparisons** (instead of tables):
Use a consistent paragraph format with the same data points for each option. Example: "The Starter plan at $499 includes custom design and basic SEO. The Essentials plan at $999 adds e-commerce and AI chatbot integration."

## Workflow

### Step 1: Topic Research & Content Gap Analysis

Before writing, define:
- **Primary keyword**: The main search term (use in title, H1, first 100 words, 2-3 H2s)
- **Secondary keywords**: 3-5 related terms to weave naturally throughout
- **Search intent**: What is the reader trying to accomplish or learn?
- **Audience**: Who is searching for this — their experience level, pain points, goals

If the user hasn't specified keywords, research them:
- Use WebSearch to check what ranks for the topic
- Look at "People Also Ask" patterns
- Identify gaps in existing content

**Content gap analysis (required):**
Read ALL existing blog post slugs, titles, tags, and excerpts from `lib/blog-posts.ts`. Then:
- Map which topics and keywords are already covered
- Identify what makes the new post distinct from every existing post
- If there is significant overlap with an existing post, flag it to the user and suggest: (a) a different angle, (b) an update to the existing post instead, or (c) a complementary deep-dive that references the existing post

Present the keyword strategy AND a one-line differentiation statement to the user before writing:
> "This post covers [X] which our existing post on [Y] does not address because [Z]."

### Step 2: Choose an Archetype & Build the Outline

Choose the post archetype that best fits the topic, or ask the user if it's ambiguous. These are starting scaffolds — adapt, combine, and deviate as the topic demands. The test is whether the structure serves the reader, not whether it matches a template.

**Archetype A: Explainer** — "What Is X and Why It Matters"
Best for: introducing concepts, technologies, or services the audience may not understand.
Structure: Intro with direct definition. H2s covering: what it is (definition block), how it works, real-world benefits or use cases, deeper technical or strategic detail, costs if relevant, getting started or next steps, CTA.

**Archetype B: Cost / Pricing Guide** — "How Much Does X Cost"
Best for: topics where the audience's primary intent is understanding pricing.
Structure: Intro with price range summary upfront. H2s organized by tier or option (cheapest to most expensive), factors that affect price, ongoing/hidden costs, how to get the best value, CTA with specific pricing.

**Archetype C: Comparison** — "X vs Y: Which Is Right for You"
Best for: helping readers decide between two options.
Structure: Intro stating the key difference in one sentence. H2s for: what is X, what is Y, when X is the right choice, when Y is the right choice, a decision framework tying criteria to the reader's situation, CTA.

**Archetype D: Listicle** — "N Ways / Signs / Reasons / Mistakes..."
Best for: scannable, specific advice or awareness content.
Structure: Intro summarizing the list and why it matters. Each H2 is one numbered item (include the number in the heading text, e.g., "## 1. Your Site Loads Slowly"). Closing H2 with action steps or next moves, CTA.

**Archetype E: How-To Guide** — "How to Do X"
Best for: step-by-step process content where the reader wants to accomplish something.
Structure: Intro stating what the reader will accomplish and prerequisites. H2s as sequential steps (can include step numbers in headings). Closing sections on common mistakes and expected results, CTA.

**Archetype F: Myth-Busting / FAQ** — "X Myths About Y" or "Common Questions About Y Answered"
Best for: topics with widespread misconceptions or where the audience has many specific questions.
Structure: Intro framing the misconceptions or questions. Each H2 is a myth or question. Closing H2 with the accurate big picture, CTA.

**Outline format:**
```
Title: [Primary keyword] + [value proposition or year]
Archetype: [A-F] (adapted as needed)

Intro paragraph: answers the core question in first 60 words, contains primary keyword

## [H2 heading 1]
## [H2 heading 2]
...
## [CTA heading]
```

Present the outline to the user for approval before writing.

### Step 3: Write the Content

#### SEO On-Page Rules
- **Title**: Include primary keyword, under 60 characters ideal, compelling
- **First 100 words**: Must contain the primary keyword naturally
- **H2 headings**: 5-8 per post, include primary or secondary keywords in at least 3
- **Keyword density**: 1-3% natural density, use semantic variations
- **Word count**: Minimum 1,500 words for standard posts
- **Internal references**: Mention 2-4 other AIWebHub pages or blog posts naturally in prose. Use phrasing like "our services page at aiwebhub.io/services" or "as we covered in our guide to website costs." Do NOT use markdown link syntax — it does not render.
- **Readability**: 2-4 sentence paragraphs, scannable structure

Available pages to reference:
- `/services` — service plans and pricing
- `/about` — company background and values
- `/contact` — contact form and free consultation
- `/portfolio` — project showcase
- `/blog` — all articles (individual posts at `/blog/[slug]`)

Read `lib/blog-posts.ts` for current post slugs to reference specific articles.

#### GEO / AI Citation Optimization
- **Answer-first formatting**: Lead each section with a direct answer in the first 40-60 words, then elaborate
- **Self-contained citability blocks**: Aim for roughly 130-170 words in at least 2-3 sections. AI search engines extract passage-length snippets for citations — this range matches what Google AI Overviews and Perplexity most frequently cite. Each block should make sense on its own without needing context from other sections.
- **Quotable statements with data**: Include specific numbers, percentages, and data points with context
- **Definition patterns**: Use "X is..." format for key concepts in the first sentence of relevant sections
- **Structured prose for comparisons**: Use consistent paragraph format with the same data points for each option — this gives AI models structured information even without HTML tables
- **Question-based headings**: Match how users query AI search tools

#### E-E-A-T Signals
- **Experience**: Include first-hand observations, real project references, "we've seen" or "in our experience" where truthful
- **Expertise**: Use technical terms correctly, demonstrate depth, reference current data (include year)
- **Authoritativeness**: Reference industry sources, real tools, real companies — never fabricate
- **Trustworthiness**: Be specific about pricing, honest about limitations, include publication dates

#### Content Quality & Differentiation
- NO generic filler ("In today's fast-paced world...", "In the ever-evolving landscape...", "In the digital age...")
- NO fabricated statistics — only use real, verifiable data or clearly stated estimates
- Every paragraph must add new information — no restating the same point in different words
- Use the active voice. Be direct. Cut unnecessary words.
- Match the existing blog's tone (see references/style-guide.md)
- End with a genuine CTA that ties back to AIWebHub's services

**Differentiation requirement**: Every post must contain at least one original insight, opinion, or data point that the reader will not find in the first page of Google results for the primary keyword. This could be: pricing from AIWebHub's actual service tiers, a pattern observed from client work, a contrarian but justified position, or a specific recommendation with reasoning. Before writing, ask yourself: what does THIS post offer that the top 5 ranking articles do not? If you cannot answer that, rethink the angle.

### Step 4: Format for the Project

After writing the content, format it to match the project's blog data structure exactly:
- Read `lib/blog-posts.ts` to get the TypeScript `BlogPost` interface
- Generate: slug, title, excerpt (1-2 sentences, under 160 characters), content, author, authorTitle, publishedDate, modifiedDate, tags, readTime, image
- Use backtick template literals for content with `##` heading separators
- Calculate readTime based on ~200 words per minute (format: "N min read")
- Set image to `/blog/{slug}.png` (generated automatically)
- Reuse existing tags where appropriate, add new ones only if genuinely needed

**Content syntax verification**: Before finalizing, scan the content string and confirm it contains ONLY:
- Plain text paragraphs separated by `\n\n`
- H2 headings using `## ` prefix

If you find any `###`, `**`, `*italic*`, `[text](url)`, `- ` list items, `1. ` numbered items, or `|` table syntax — rewrite those passages using plain prose.

### Step 4.5: Generate Blog Image

After adding the post to `lib/blog-posts.ts`:
1. Set the `image` field to `/blog/{slug}.png`
2. Run `bun run generate:blog-images` to generate the blog post image
3. Verify the image was created at `public/blog/{slug}.png`

The image is generated automatically from the post's title, tags, and slug using Satori + resvg. Each post gets a unique image with the site's dark theme and gradient design.

### Step 5: Validation Checklist

Before presenting the final post, verify every item:

- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least 2 H2 headings
- [ ] 5-8 H2 sections with question/problem-based headings
- [ ] 1,500+ words
- [ ] 2-4 natural prose references to other AIWebHub pages or posts (no markdown link syntax)
- [ ] At least 3 specific statistics or data points
- [ ] At least 2 self-contained citability blocks (roughly 130-170 words each)
- [ ] Answer-first formatting in opening paragraph
- [ ] "X is..." definition pattern for the core topic
- [ ] Image field set to `/blog/{slug}.png`
- [ ] Blog image generated via `bun run generate:blog-images`
- [ ] Author, dates, and tags populated
- [ ] Excerpt is compelling and under 160 characters
- [ ] No generic filler phrases
- [ ] No fabricated data
- [ ] CTA paragraph directing readers to contact or services
- [ ] Content angle is distinct from existing blog posts (state how)
- [ ] At least one original insight not found in top search results
- [ ] No unsupported markdown syntax (no H3, bold, italic, links, lists, tables)
- [ ] Content builds on (not duplicates) existing blog posts
- [ ] Build passes — verify the final code compiles

Present this checklist with pass/fail to the user alongside the final post.

## Content Style Guide

See [references/style-guide.md](references/style-guide.md) for tone, formatting constraints, and phrase patterns.

## SEO Reference

See [references/seo-checklist.md](references/seo-checklist.md) for the complete on-page SEO and GEO optimization reference.

## Site Context (Quick Reference)

**Service tiers:**
- Starter: $499 one-time + $30/month
- Essentials: $999 + $50/month (most popular)
- Professional: $1,999 + $100/month
- AI Agents: $2,499 + $150/month

**Author**: Cosmin Balaur, Founder & Lead Developer at AIWebHub
**Domain**: aiwebhub.io
**Existing tags** (reuse when applicable): Web Design, Pricing, Business, AI Integration, Strategy, Technology, AI Agents

## Important Notes

- Always read existing blog posts first — never write in a vacuum
- Ask the user for topic, target audience, and any specific points to include before starting
- Present keyword strategy, differentiation statement, and outline for approval before writing full content
- If the user provides a URL or company to reference, use WebSearch to gather accurate facts — never guess
- If you notice existing blog posts using unsupported markdown syntax (H3s, links), flag this to the user as a separate fix
- Build passes are required — verify the final code compiles before marking complete
