---
name: blog-writer
description: Creates SEO-optimized, GEO-ready blog posts with E-E-A-T signals, structured for AI search citability. Use when user says "write a blog", "create blog post", "new blog article", "blog about", "write an article about", or asks to add content to a blog. Handles keyword research, content structuring, schema markup readiness, and internal linking.
---

# Blog Writer

Creates high-quality, SEO-optimized blog posts designed to rank in traditional search and get cited by AI search engines (ChatGPT, Perplexity, Google AI Overviews).

## When Activated

1. Read the project's blog data file to understand the existing interface, author info, tags, and content style
2. Read 1-2 existing blog posts to match voice, structure, and depth
3. Follow the workflow below

## Workflow

### Step 1: Topic Research & Keyword Strategy

Before writing, define:
- **Primary keyword**: The main search term (use in title, H1, first 100 words, 2-3 H2s)
- **Secondary keywords**: 3-5 related terms to weave naturally throughout
- **Search intent**: What is the reader trying to accomplish or learn?
- **Audience**: Who is searching for this — their experience level, pain points, goals

If the user hasn't specified keywords, research them:
- Use WebSearch to check what ranks for the topic
- Look at "People Also Ask" patterns
- Identify gaps in existing content the user's site hasn't covered

Present the keyword strategy to the user before writing.

### Step 2: Outline with Question-Based H2s

Structure the post using question-based or problem-based H2 headings. These directly match how people search and how AI models extract answers.

Outline template:
```
Title: [Primary keyword] + [value proposition or year]

Intro paragraph (contains primary keyword in first 60 words, answers the core question immediately)

## What Is [Topic]? (definition block — 134-167 words, self-contained)
## How Does [Topic] Work / Differ from [Alternative]?
## [Real-World Use Cases / Benefits] (specific examples, statistics)
## [Deeper Technical or Strategic Section]
## How Much Does [Topic] Cost? (if applicable — tie to user's pricing)
## [Getting Started / How to Choose / Next Steps]
## [CTA paragraph with internal link to /contact]
```

Present the outline to the user for approval before writing.

### Step 3: Write the Content

Follow these rules strictly:

#### SEO On-Page Rules
- **Title**: Include primary keyword, under 60 characters ideal, compelling
- **First 100 words**: Must contain the primary keyword naturally
- **H2 headings**: 5-8 per post, include primary or secondary keywords in at least 3
- **Keyword density**: 1-3% natural density, use semantic variations
- **Word count**: Minimum 1,500 words for blog posts (per quality gates)
- **Internal links**: 2-4 links to other pages on the site using descriptive anchor text
- **Readability**: 2-4 sentence paragraphs, scannable structure

#### GEO / AI Citation Optimization
- **Answer-first formatting**: Lead each section with a direct answer, then elaborate
- **Self-contained citability blocks**: Each H2 section should be 134-167 words and make sense on its own — AI models extract passages, not full articles
- **Quotable statements with statistics**: Include specific numbers, percentages, and data points with context
- **Definition patterns**: Use "X is..." format for key concepts in the first sentence of relevant sections
- **Tables and lists**: Use for comparative data — AI models favor structured information
- **Question-based headings**: Match how users query AI search tools

#### E-E-A-T Signals
- **Experience**: Include first-hand observations, real project references, "we've seen" or "in our experience" where truthful
- **Expertise**: Use technical terms correctly, demonstrate depth, reference current data (include year)
- **Authoritativeness**: Reference industry sources, real tools, real companies — never fabricate
- **Trustworthiness**: Be specific about pricing, honest about limitations, include publication dates

#### Content Quality Rules
- NO generic filler ("In today's fast-paced world...", "In the ever-evolving landscape...")
- NO fabricated statistics — only use real, verifiable data or clearly stated estimates
- Every paragraph must add new information — no restating the same point
- Use the active voice. Be direct. Cut unnecessary words.
- Match the existing blog's tone: professional, knowledgeable, helpful without being salesy
- End with a genuine CTA that ties back to the user's services

### Step 4: Format for the Project

After writing the content, format it to match the project's blog data structure exactly:
- Read the blog data file (e.g., `lib/blog-posts.ts`) to get the TypeScript interface
- Generate: slug, title, excerpt (1-2 sentences summarizing the post), content, author, authorTitle, publishedDate, modifiedDate, tags, readTime, image
- Use backtick template literals for content with `##` heading separators
- Calculate readTime based on ~200 words per minute
- Choose an appropriate image from existing assets or ask the user
- Add relevant tags — reuse existing tags where appropriate, add new ones only if genuinely needed

### Step 5: SEO Validation Checklist

Before presenting the final post, verify:

- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least 2 H2 headings
- [ ] 5-8 H2 sections with question/problem-based headings
- [ ] 1,500+ words
- [ ] 2-4 internal links with descriptive anchors
- [ ] At least 3 specific statistics or data points
- [ ] At least 2 self-contained citability blocks (134-167 words each)
- [ ] Answer-first formatting in opening paragraph
- [ ] "X is..." definition pattern for the core topic
- [ ] Author, dates, and tags populated
- [ ] Excerpt is compelling and under 200 characters
- [ ] No generic filler phrases
- [ ] No fabricated data
- [ ] CTA with internal link at the end
- [ ] Content builds on (not duplicates) existing blog posts

Present this checklist with pass/fail to the user alongside the final post.

## Content Style Guide

See [references/style-guide.md](references/style-guide.md) for tone, formatting, and phrase patterns.

## SEO Reference

See [references/seo-checklist.md](references/seo-checklist.md) for the complete on-page SEO and GEO optimization reference.

## Important Notes

- Always read existing blog posts first — never write in a vacuum
- Ask the user for topic, target audience, and any specific points to include before starting
- Present keyword strategy and outline for approval before writing full content
- If the user provides a URL or company to reference, use WebSearch to gather accurate facts — never guess
- Build passes are required — verify the final code compiles before marking complete
