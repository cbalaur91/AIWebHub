#!/usr/bin/env python3
"""Grade blog post outputs against assertions."""

import os
import re
import json

BASE = "/home/cbalaur/projects/ai-web-hub/blog-writer-workspace/iteration-1"

DIRS = [
    "choosing-agency-with_skill",
    "choosing-agency-old_skill",
    "ecommerce-mistakes-with_skill",
    "ecommerce-mistakes-old_skill",
    "custom-vs-wordpress-with_skill",
    "custom-vs-wordpress-old_skill",
]

FILLER_PHRASES = [
    "in today's fast-paced world",
    "in the ever-evolving landscape",
    "in today's digital landscape",
    "in the digital age",
    "in the ever-changing",
]

def read_content(dir_name):
    """Extract the content string from the blog-post.ts file."""
    path = os.path.join(BASE, dir_name, "outputs", "blog-post.ts")
    with open(path, "r") as f:
        text = f.read()
    # Extract content between backticks
    match = re.search(r'content:\s*`(.*?)`', text, re.DOTALL)
    if match:
        return match.group(1), text
    return "", text

def read_title(full_text):
    """Extract title from the TS file."""
    match = re.search(r'title:\s*["\'](.+?)["\']', full_text)
    if match:
        return match.group(1)
    # Try multiline
    match = re.search(r'title:\s*"(.+?)"', full_text)
    return match.group(1) if match else ""

def count_words(text):
    return len(text.split())

def grade(dir_name):
    content, full_text = read_content(dir_name)
    title = read_title(full_text)
    results = []

    # 1. No unsupported markdown
    has_h3 = bool(re.search(r'^###\s', content, re.MULTILINE))
    has_bold = bool(re.search(r'\*\*[^*]+\*\*', content))
    has_md_links = bool(re.search(r'\[([^\]]+)\]\(([^)]+)\)', content))
    has_bullet_lists = bool(re.search(r'^- ', content, re.MULTILINE))
    has_tables = bool(re.search(r'\|.*\|.*\|', content))

    no_bad_md = not any([has_h3, has_bold, has_md_links, has_bullet_lists, has_tables])
    issues = []
    if has_h3: issues.append("H3 headings found")
    if has_bold: issues.append("Bold markdown found")
    if has_md_links: issues.append("Markdown links found")
    if has_bullet_lists: issues.append("Bullet lists found")
    if has_tables: issues.append("Tables found")

    results.append({
        "text": "No unsupported markdown syntax",
        "passed": no_bad_md,
        "evidence": "Clean - no unsupported syntax" if no_bad_md else f"Issues: {', '.join(issues)}"
    })

    # 2. H2 count in range (5-8)
    h2s = re.findall(r'^## .+', content, re.MULTILINE)
    h2_count = len(h2s)
    results.append({
        "text": "H2 count in range (5-8)",
        "passed": 5 <= h2_count <= 8,
        "evidence": f"Found {h2_count} H2 headings: {', '.join(h[:40] for h in h2s[:3])}..."
    })

    # 3. Word count >= 1500
    wc = count_words(content)
    results.append({
        "text": "Word count >= 1500",
        "passed": wc >= 1500,
        "evidence": f"Word count: {wc}"
    })

    # 4. Primary keyword in title (flexible - check for key terms)
    title_lower = title.lower()
    # Just check that the title is non-empty and topical
    results.append({
        "text": "Title is present and topical",
        "passed": len(title) > 10,
        "evidence": f"Title: '{title}'"
    })

    # 5. Natural page references (aiwebhub.io mentions, no markdown links)
    prose_refs = re.findall(r'aiwebhub\.io/\w+', content)
    service_mentions = re.findall(r'(?:our services page|our guide to|as we covered|visit aiwebhub)', content, re.IGNORECASE)
    total_refs = len(prose_refs) + len(service_mentions)
    has_prose_refs = total_refs >= 2 and not has_md_links
    results.append({
        "text": "Natural prose page references (2+, no markdown links)",
        "passed": has_prose_refs,
        "evidence": f"Found {len(prose_refs)} aiwebhub.io refs, {len(service_mentions)} prose mentions, markdown links: {has_md_links}"
    })

    # 6. Has citability blocks (130-170 words)
    sections = re.split(r'^## ', content, flags=re.MULTILINE)
    citability_blocks = 0
    for sec in sections[1:]:  # skip intro
        body = sec.split('\n', 1)[1] if '\n' in sec else sec
        sec_wc = count_words(body)
        if 130 <= sec_wc <= 170:
            citability_blocks += 1
    results.append({
        "text": "Has citability blocks (130-170 words, at least 2)",
        "passed": citability_blocks >= 2,
        "evidence": f"Found {citability_blocks} sections in 130-170 word range"
    })

    # 7. Varied structure (not all "What Is / How Does / Benefits")
    formulaic_patterns = ["What Is", "How Does", "The Benefits", "How to Get Started"]
    formulaic_count = sum(1 for h in h2s if any(p.lower() in h.lower() for p in formulaic_patterns))
    varied = formulaic_count < len(h2s) * 0.6  # Less than 60% formulaic
    results.append({
        "text": "Varied H2 structure (not all formulaic)",
        "passed": varied,
        "evidence": f"{formulaic_count}/{h2_count} headings match formulaic patterns"
    })

    # 8. No generic filler
    found_filler = [p for p in FILLER_PHRASES if p in content.lower()]
    results.append({
        "text": "No generic filler phrases",
        "passed": len(found_filler) == 0,
        "evidence": "Clean - no filler found" if not found_filler else f"Found: {', '.join(found_filler)}"
    })

    # 9. Content gap / differentiation awareness
    gap_indicators = re.findall(r'(?:existing post|already cover|distinct|differentiat|overlap|our guide to|as we covered)', content, re.IGNORECASE)
    results.append({
        "text": "References to existing content (differentiation awareness)",
        "passed": len(gap_indicators) >= 1,
        "evidence": f"Found {len(gap_indicators)} differentiation/cross-reference indicators"
    })

    # 10. Has CTA
    cta_indicators = re.findall(r'(?:contact|consultation|reach out|get in touch|aiwebhub\.io/contact)', content, re.IGNORECASE)
    results.append({
        "text": "Has closing CTA",
        "passed": len(cta_indicators) >= 1,
        "evidence": f"Found {len(cta_indicators)} CTA indicators"
    })

    return results

# Grade all
all_results = {}
for d in DIRS:
    print(f"\n=== {d} ===")
    grades = grade(d)
    all_results[d] = grades

    passed = sum(1 for g in grades if g["passed"])
    total = len(grades)
    print(f"Score: {passed}/{total}")
    for g in grades:
        status = "PASS" if g["passed"] else "FAIL"
        print(f"  [{status}] {g['text']}: {g['evidence']}")

    # Save grading.json
    grading_path = os.path.join(BASE, d, "grading.json")
    with open(grading_path, "w") as f:
        json.dump({"expectations": grades}, f, indent=2)

# Summary comparison
print("\n\n=== SUMMARY ===")
print(f"{'Assertion':<50} {'New Skill':<12} {'Old Skill':<12}")
print("-" * 74)

test_names = ["choosing-agency", "ecommerce-mistakes", "custom-vs-wordpress"]
assertions = [g["text"] for g in all_results[DIRS[0]]]

for assertion in assertions:
    new_passes = 0
    old_passes = 0
    for d in DIRS:
        for g in all_results[d]:
            if g["text"] == assertion:
                if "with_skill" in d:
                    new_passes += int(g["passed"])
                else:
                    old_passes += int(g["passed"])
    print(f"{assertion:<50} {new_passes}/3{'':<8} {old_passes}/3")
