<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  url: string;
  image?: string;
  order: number;
  tag?: string;
}

interface ProjectsResponse {
  projects: Project[];
}

const { data: projectData } = await useFetch<ProjectsResponse>("/api/projects");

useHead({
  title: "Projects | Atif Mehmood",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "description",
      content:
        "Explore my portfolio of frontend development projects built with Vue.js, Nuxt, and Firebase. Each project showcases different aspects of modern web development.",
    },
    {
      name: "keywords",
      content:
        "portfolio projects, web development, Vue.js projects, Nuxt applications, frontend development, Firebase projects, Atif Mehmood work",
    },
    {
      property: "og:title",
      content: "Projects | Atif Mehmood",
    },
    {
      property: "og:description",
      content:
        "Explore my portfolio of frontend development projects built with Vue.js, Nuxt, and Firebase.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://hiatif.vercel.app/projects",
    },
    {
      property: "og:image",
      content: "/og/og-projects.png",
    },
    {
      property: "og:locale",
      content: "en_US",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Projects | Atif Mehmood",
    },
    {
      name: "twitter:description",
      content:
        "Explore my portfolio of frontend development projects built with Vue.js, Nuxt, and Firebase.",
    },
    {
      name: "twitter:image",
      content: "/og/og-projects.png",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://hiatif.vercel.app/projects",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});
</script>

<template>
  <main class="h-[80vh] md:h-[70vh] relative mx-auto w-full md:w-1/2">
    <div
      class="h-full grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 px-4 md:px-2 pt-[20vh] pb-10 overflow-auto"
    >
      <div
        v-for="project in projectData?.projects"
        :key="project.name"
        @click="openLink(project.url)"
        class="relative flex flex-col items-start justify-start p-5 rounded-lg hover:bg-gray-100/60 dark:hover:bg-gray-900/30 group cursor-pointer"
      >
        <!-- index -->
        <div
          class="absolute -top-2 text-xl opacity-35 -left-2 z-0 p-2 dark:text-gray-700 text-gray-300"
        >
          #{{ project.order }}
        </div>

        <!-- tag -->
        <div
          v-if="project.tag"
          class="absolute top-1 right-1 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
        >
          {{ project.tag }}
        </div>

        <h3
          class="text-xl font-semibold dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors"
        >
          <LinkPreview :url="project.url">
            {{ project.name }}
          </LinkPreview>
        </h3>
        <p
          class="text-sm dark:text-gray-300 line-clamp-3 mt-2"
          :title="project.description"
        >
          {{ project.description }}
        </p>
      </div>
    </div>

    <div
      class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-950/40 pointer-events-none"
    ></div>
  </main>
</template>
