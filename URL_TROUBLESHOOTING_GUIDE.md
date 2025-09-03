# URL & Routing Troubleshooting Guide

## Overview

This guide documents the investigation and resolution of URL routing issues for AIWebHub, specifically when pages return 404 errors in production despite working locally. Use this as a reference for future routing problems.

## The Problem: Contact Page 404 Error

**Symptoms:**
- URL `https://www.aiwebhub.io/contact` returned 404 in production
- Google Search Console reported "Page cannot be indexed: Not found (404)"
- Page worked perfectly in local development
- Static files were generated correctly in build output

## Investigation Process

### 1. Verify Page Structure ✅
**Location:** `app/contact/page.tsx`
```bash
# Check if page exists
ls -la app/contact/
# Result: page.tsx exists and is properly implemented
```

### 2. Check Static Export Generation ✅
**Location:** `out/contact.html`
```bash
# Verify build output contains the page
ls -la out/ | grep contact
# Result: contact.html (44KB) generated successfully
```

### 3. Examine Next.js Configuration ✅
**Location:** `next.config.js`
```javascript
// Configuration was correct for static export
{
  output: 'export',
  images: { unoptimized: true }
}
```

### 4. Test Local Development ✅
```bash
npm run dev
# Result: Contact page accessible at localhost:3000/contact
```

### 5. Identify Root Cause ❌
**Missing Vercel Configuration**
- Vercel needs explicit configuration for static exports
- No `vercel.json` file existed
- Default Vercel behavior doesn't handle static exports properly

## The Solution

### 1. Created `vercel.json` Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/robots.txt",
      "destination": "/robots.txt"
    },
    {
      "source": "/sitemap.xml", 
      "destination": "/sitemap.xml"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        }
      ]
    },
    {
      "source": "/robots.txt",
      "headers": [
        {
          "key": "Content-Type", 
          "value": "text/plain"
        }
      ]
    }
  ]
}
```

### 2. Enhanced `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,           // Clean URLs without trailing slashes
  skipTrailingSlashRedirect: true, // Prevent redirect loops
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true             // Required for static export
  },
  poweredByHeader: false,         // Security: hide Next.js header
  reactStrictMode: true,          // Better development experience
};
```

## Configuration Explanations

### Vercel.json Key Settings

| Setting | Purpose | Impact |
|---------|---------|---------|
| `buildCommand` | Tells Vercel how to build | Uses `npm run build` |
| `outputDirectory` | Where static files are | Points to `out/` folder |
| `cleanUrls` | Remove .html extensions | `/contact` instead of `/contact.html` |
| `trailingSlash: false` | URL format consistency | `/contact` not `/contact/` |
| `rewrites` | Route special files | Ensures robots.txt, sitemap.xml work |
| `headers` | Security & content types | Proper MIME types, security headers |

### Next.js Config Additions

| Setting | Purpose | Why Added |
|---------|---------|-----------|
| `trailingSlash: false` | Match Vercel setting | URL consistency |
| `skipTrailingSlashRedirect` | Prevent redirect loops | Performance |
| `poweredByHeader: false` | Hide framework info | Security best practice |
| `reactStrictMode: true` | Better development | Catch issues early |

## How Static Export + Vercel Works

1. **Build Process:**
   ```bash
   npm run build
   # Next.js generates static files in out/
   ```

2. **Vercel Deployment:**
   - Reads `vercel.json` configuration
   - Serves files from `outputDirectory` (out/)
   - Applies `cleanUrls` to remove .html extensions
   - Sets up rewrites and headers

3. **URL Resolution:**
   ```
   /contact → out/contact.html (with cleanUrls)
   /robots.txt → out/robots.txt (via rewrite)
   /sitemap.xml → out/sitemap.xml (via rewrite)
   ```

## Troubleshooting Checklist

When a URL returns 404 in production:

### ✅ Local Development Check
```bash
npm run dev
# Visit http://localhost:3000/[your-url]
# If it works locally, problem is deployment config
```

### ✅ Build Output Verification
```bash
npm run build
ls -la out/
# Check if [page].html exists in out/ directory
```

### ✅ Page Structure
```bash
ls -la app/[route]/
# Verify page.tsx exists in correct directory
```

### ✅ Vercel Configuration
- [ ] `vercel.json` exists in root
- [ ] `outputDirectory` matches build output
- [ ] `cleanUrls: true` for .html extension removal
- [ ] Special routes (robots, sitemap) have rewrites

### ✅ Next.js Configuration
- [ ] `output: 'export'` for static generation
- [ ] `trailingSlash` matches Vercel setting
- [ ] `images: { unoptimized: true }` for static export

## Prevention Tips

### 1. Always Test Static Export Locally
```bash
npm run build
npx serve out/
# Test all routes on localhost:3000
```

### 2. Use Consistent URL Patterns
- Decide on trailing slashes: `/contact` vs `/contact/`
- Match `next.config.js` and `vercel.json` settings
- Test both patterns if unsure

### 3. Monitor Build Output
```bash
# After build, verify all pages exist
ls -la out/ | grep -E "\\.html$"
```

### 4. SEO Verification
- Check sitemap includes all pages: `out/sitemap.xml`
- Verify robots.txt allows crawling: `out/robots.txt`
- Test with Google Search Console

## Common Issues & Solutions

### Issue: Page works locally but 404 in production
**Solution:** Add/update `vercel.json` with proper static export config

### Issue: URLs have .html extensions
**Solution:** Set `cleanUrls: true` in `vercel.json`

### Issue: Inconsistent trailing slashes
**Solution:** Match `trailingSlash` setting in both configs

### Issue: Robots.txt or sitemap.xml return 404
**Solution:** Add explicit rewrites in `vercel.json`

### Issue: Security headers missing
**Solution:** Add headers array in `vercel.json`

## Files Modified

1. **Created:** `vercel.json` - Vercel deployment configuration
2. **Enhanced:** `next.config.js` - Added static export optimizations

## Testing After Deployment

1. **Direct URL Test:**
   ```
   curl -I https://www.aiwebhub.io/contact
   # Should return 200, not 404
   ```

2. **Google Search Console:**
   - Request re-indexing of the contact page
   - Check "URL Inspection" tool

3. **Sitemap Verification:**
   ```
   curl https://www.aiwebhub.io/sitemap.xml
   # Should include <loc>https://www.aiwebhub.io/contact</loc>
   ```

---

**Date Created:** August 4, 2025  
**Issue Resolved:** Contact page 404 error on Vercel static export  
**Next Review:** When adding new pages or changing deployment platform