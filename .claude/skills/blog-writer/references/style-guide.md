# Blog Content Style Guide

## Voice & Tone

- Professional but approachable — not academic, not casual
- Authoritative without being condescending
- Direct and specific — every sentence should add value
- Confident about what we know, honest about what varies

## Sentence Structure

- Active voice by default ("We build..." not "Websites are built by...")
- Short sentences for emphasis. Longer ones for explanation.
- 2-4 sentences per paragraph maximum
- Vary sentence length to maintain rhythm

## Word Choices

### Use
- "Build", "create", "develop" (active, concrete)
- Specific numbers and ranges ("$499 to $1,999", "70 to 85 percent")
- Technical terms used correctly with brief explanations when introduced
- Current year references for freshness signals

### Avoid
- "In today's fast-paced world" / "In the ever-evolving landscape"
- "Leverage", "utilize" (use "use")
- "Cutting-edge", "state-of-the-art", "game-changing" (be specific instead)
- "It's important to note that..." (just say it)
- "Basically", "essentially" (filler words)
- "Navigate" when meaning "understand" or "handle"
- "Landscape" in "the digital landscape", "the AI landscape"
- "Robust" (overused filler adjective — describe what makes it strong)
- "Seamless" / "seamlessly" (describe what makes integration smooth)
- "Harness" / "harness the power of" (just say "use")
- Exclamation points (convey enthusiasm through substance, not punctuation)

## Structure Patterns

Structure varies by post type — see SKILL.md for post archetypes. The patterns below apply universally regardless of archetype.

### Opening Paragraph
- Answer the core question in the first 2 sentences
- Include the primary keyword naturally
- Set expectations for what the post covers
- No lengthy preambles

### Section Bodies
- Lead with the direct answer or key point
- Then provide supporting detail, examples, data
- Close with practical implication or transition

### Closing Section
- Summarize the key actionable takeaway
- Tie back to AIWebHub's specific services or pricing
- Include a natural CTA directing readers to get in touch or visit the services page
- Don't introduce new concepts in the closing

## Formatting — Renderer Constraints

The blog renderer is a simple custom parser. It supports ONLY two things:

1. **H2 headings** — lines starting with `## ` (used to split the post into sections)
2. **Plain text paragraphs** — separated by blank lines (`\n\n`)

Everything else renders as raw literal text on the page. Do NOT use any of the following in blog content:

- `### ` or deeper headings (renders as text with `###` visible)
- `**bold**` or `*italic*` (renders as literal asterisks)
- `[link text](url)` (renders as the literal string, not a clickable link)
- `- ` bullet lists (renders as text with dashes visible)
- `1. ` numbered lists (renders as text with numbers visible)
- `| table |` syntax (renders as literal pipe characters)
- `` `code` `` or code blocks (renders as literal backticks)
- `> blockquotes` (renders as text with `>` visible)

### Internal References (instead of links)
Since markdown links do not render, reference other pages in natural prose:
- "Visit our services page at aiwebhub.io/services for pricing details"
- "As we covered in our guide to website costs, pricing depends on..."
- "Contact us at aiwebhub.io/contact to discuss your project"

### List-Like Content (instead of bullet lists)
Present series of points as short standalone paragraphs, each starting with a clear topic phrase:

Instead of:
```
- Fast load times improve SEO
- Mobile responsiveness is essential
- Clear CTAs drive conversions
```

Write:
```
Fast load times directly improve your search rankings. Google uses page speed as a ranking factor...

Mobile responsiveness is no longer optional. Over 60 percent of web traffic comes from phones...

Clear calls-to-action drive conversions. Every page should guide visitors toward a specific next step...
```

### Comparison Data (instead of tables)
Use a consistent paragraph format with the same data points for each option:

"Our Starter plan at $499 includes a single-page website, mobile-responsive design, and basic SEO. The Essentials plan at $999 adds a custom multi-page website, AI chatbot integration, and GEO optimization. The Professional plan at $1,999 adds e-commerce functionality and social media content creation."

## Numbers and Currency

- Spell out one through nine, use digits for 10+
- Percentages: spell out "percent" (not %)
- Currency: use dollar sign with comma separators ($2,499)

## Attribution

- Author: "Cosmin Balaur"
- Author Title: "Founder & Lead Developer at AIWebHub"
- Always include publishedDate and modifiedDate in ISO format
