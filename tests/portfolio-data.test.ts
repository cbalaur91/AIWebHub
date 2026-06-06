import { describe, expect, test } from "bun:test";
import {
  getAllCategories,
  getAllProjects,
  getProjectBySlug,
  getProjectsByCategory,
} from "@/lib/portfolio-data";

describe("portfolio content query interface", () => {
  test("getProjectBySlug returns the matching project (slug hit)", () => {
    const slug = "romanian-banquet-hall";
    const project = getProjectBySlug(slug);
    expect(project).toBeDefined();
    expect(project?.slug).toBe(slug);
    expect(project?.title).toBe("Romanian Banquet Hall");
  });

  test("getProjectBySlug returns undefined for an unknown slug (slug miss)", () => {
    expect(getProjectBySlug("this-slug-does-not-exist")).toBeUndefined();
  });

  test("getProjectsByCategory returns exactly the projects in that category (category filter)", () => {
    const category = "landing-page";
    const filtered = getProjectsByCategory(category);

    expect(filtered.length).toBeGreaterThan(0);
    // every returned project is in the category...
    expect(filtered.every((p) => p.category === category)).toBe(true);
    // ...and the result is the full set of projects in it, in order.
    const expected = getAllProjects().filter((p) => p.category === category);
    expect(filtered.map((p) => p.slug)).toEqual(expected.map((p) => p.slug));
  });

  test("getProjectsByCategory('all') is empty — 'all' is a UI filter, not a real category", () => {
    expect(getProjectsByCategory("all")).toEqual([]);
  });

  test("getAllCategories exposes the folded category set (category set)", () => {
    const categories = getAllCategories();
    const values = categories.map((c) => c.value);

    // no duplicate category values
    expect(values.length).toBe(new Set(values).size);
    // the "All" filter entry is folded in, first, with label/value shape
    expect(categories[0]).toEqual({ label: "All", value: "all" });
    // single source of truth: every real project category is in the list
    const projectCategories = new Set(getAllProjects().map((p) => p.category));
    for (const cat of projectCategories) {
      expect(values).toContain(cat);
    }
  });

  test("getAllProjects exposes every project as a defensive copy", () => {
    const a = getAllProjects();
    const b = getAllProjects();
    expect(a.length).toBeGreaterThan(0);
    // callers cannot mutate the module's private array through the result
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});
