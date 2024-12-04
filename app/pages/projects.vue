<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  url: string;
  image?: string;
  order: number;
}

interface ProjectsResponse {
  projects: Project[];
}

const { data: projectData } = await useFetch<ProjectsResponse>("/api/projects");
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
        class="relative flex flex-col items-start justify-start p-5 rounded-lg ring-0 hover:ring-1 hover:ring-black dark:hover:ring-gray-700"
      >
        <!-- index -->
        <div
          class="absolute -top-2 -left-2 z-0 p-2 dark:text-gray-700 text-gray-300"
        >
          #{{ project.order }}
        </div>
        <h3 class="text-xl font-semibold dark:text-gray-200">
          {{ project.name }}
        </h3>
        <p
          class="text-sm dark:text-gray-300 line-clamp-3"
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
