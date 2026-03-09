# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need to pull data from a website, don't attempt it directly. Read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)
- Example: You get rate-limited on an API, so you dig into the docs, discover a batch endpoint, refactor the tool to use it, verify it works, then update the workflow so this never happens again

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

This loop is how the framework improves over time.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AIWebHub is a modern web agency website built with Next.js 15, TypeScript, and TailwindCSS. The site features a dark theme design with gradient elements and animations, showcasing web development services with sections for hero, services, process, testimonials, and contact.

## Architecture & Structure

### Core Framework
- **Next.js 15** with App Router (app/ directory structure)
- **TypeScript** for type safety
- **TailwindCSS** with CSS variables for theming
- **Static export** configuration (output: 'export' in next.config.js)

### UI Component System
- **shadcn/ui** components in `components/ui/`
- **Radix UI** primitives for accessibility
- **Framer Motion** for animations
- **Lucide React** for icons

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `components/ui/` - shadcn/ui component library
- `lib/` - Utility functions (primarily `utils.ts` with cn() function)
- `hooks/` - Custom React hooks
- `public/` - Static assets including video background

### Component Architecture
- Uses client components (`"use client"`) for interactive elements
- Consistent gradient theming: `from-blue-600 via-purple-600 to-pink-600`
- Dark background theme with `bg-[#111111]` base
- Motion animations with staggered delays

### Path Aliases
Uses `@/` prefix for imports:
- `@/components` → components/
- `@/lib` → lib/
- `@/hooks` → hooks/

### Styling Approach
- TailwindCSS with custom CSS variables
- Dark mode ready with `darkMode: ['class']`
- Custom animations and keyframes
- Responsive design patterns

## Key Technical Details

### Next.js Configuration
- Static export mode for deployment
- ESLint disabled during builds
- Unoptimized images for static export

### TypeScript Setup
- Strict mode enabled
- Next.js plugin integration
- Path mapping configured for `@/*`

### Component Patterns
- Page components import and compose section components
- Consistent button styling with gradient backgrounds
- Video background with overlay patterns
- Form handling with react-hook-form and zod validation

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.
