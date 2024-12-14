export default defineEventHandler(async () => {
  // Fetch projects
  const response = await $fetch("/api/projects");

  if (!response || !response.projects) {
    return [];
  }

  // Map projects to sitemap URLs
  return response.projects.map((project) => ({
    url: `/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.5,
  }));
});
