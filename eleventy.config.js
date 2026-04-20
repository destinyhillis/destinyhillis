module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections
  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/notes/**/*.md")
      .filter((item) => item.data.visibility === "public")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("collections", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/collections/**/*.md")
      .filter((item) => item.data.visibility === "public")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("pages", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/pages/**/*.md")
      .filter((item) => item.data.visibility === "public");
  });

  // Recent: last 10 public items across notes + collections, sorted by date
  eleventyConfig.addCollection("recent", function (collectionApi) {
    const notes = collectionApi.getFilteredByGlob("src/content/notes/**/*.md");
    const collections = collectionApi.getFilteredByGlob("src/content/collections/**/*.md");
    return [...notes, ...collections]
      .filter((item) => item.data.visibility === "public")
      .sort((a, b) => b.date - a.date)
      .slice(0, 10);
  });

  // Date formatting filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // ISO date filter
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  // Truncate text to a character limit for previews
  eleventyConfig.addFilter("truncate", (text, length) => {
    if (!text) return "";
    const stripped = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (stripped.length <= length) return stripped;
    return stripped.slice(0, length).replace(/\s+\S*$/, "") + "…";
  });

  // Backlinks filter — finds notes that link to the current page
  eleventyConfig.addFilter("backlinks", function (targetUrl, allNotes) {
    if (!allNotes) return [];
    return allNotes.filter((note) => {
      const content = note.template?.frontMatter?.content || "";
      return content.includes(targetUrl);
    });
  });

  // Basic search index (JSON output for client-side search)
  eleventyConfig.addCollection("searchIndex", function (collectionApi) {
    return collectionApi.getAll()
      .filter((item) => item.data.visibility === "public" && item.data.title)
      .map((item) => ({
        title: item.data.title,
        url: item.url,
        summary: item.data.summary || "",
        tags: item.data.tags || [],
        date: item.date,
      }));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
