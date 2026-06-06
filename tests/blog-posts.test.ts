import { describe, expect, test } from "bun:test";
import {
  getAllPosts,
  getAllTags,
  getPostBySlug,
  getPostsByTag,
} from "@/lib/blog-posts";

describe("blog content query interface", () => {
  test("getPostBySlug returns the matching post (slug hit)", () => {
    const slug = "how-much-does-a-custom-website-cost-in-2026";
    const post = getPostBySlug(slug);
    expect(post).toBeDefined();
    expect(post?.slug).toBe(slug);
    expect(post?.title).toBe("How Much Does a Custom Website Cost in 2026?");
  });

  test("getPostBySlug returns undefined for an unknown slug (slug miss)", () => {
    expect(getPostBySlug("this-slug-does-not-exist")).toBeUndefined();
  });

  test("getPostsByTag returns exactly the posts carrying that tag (tag filter)", () => {
    const tag = "Web Design";
    const tagged = getPostsByTag(tag);

    expect(tagged.length).toBeGreaterThan(0);
    // every returned post actually carries the tag...
    expect(tagged.every((post) => post.tags.includes(tag))).toBe(true);
    // ...and the result is the full set of posts that carry it, in order.
    const expected = getAllPosts().filter((post) => post.tags.includes(tag));
    expect(tagged.map((p) => p.slug)).toEqual(expected.map((p) => p.slug));
  });

  test("getPostsByTag returns an empty array for an unused tag", () => {
    expect(getPostsByTag("No Such Tag")).toEqual([]);
  });

  test("getAllTags returns the de-duplicated tag set (tag set)", () => {
    const tags = getAllTags();

    // no duplicates
    expect(tags.length).toBe(new Set(tags).size);
    // equals the union of every post's tags, first-seen order
    const union = Array.from(new Set(getAllPosts().flatMap((p) => p.tags)));
    expect(tags).toEqual(union);
    // known tags are present
    expect(tags).toContain("Web Design");
    expect(tags).toContain("AI Integration");
  });

  test("getAllPosts exposes every post as a defensive copy", () => {
    const a = getAllPosts();
    const b = getAllPosts();
    expect(a.length).toBeGreaterThan(0);
    // callers cannot mutate the module's private array through the result
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});
