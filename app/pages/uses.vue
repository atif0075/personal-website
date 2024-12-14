<script setup lang="ts">
import type { Letter } from "~/types";

const pageTitle = "uses";
const letters = ref<Letter[]>([]);
const contentLines = ref<boolean[]>([false, false, false]);

onMounted(() => {
  // Create letters for animation
  letters.value = [...pageTitle].map(
    (char): Letter => ({
      char,
      visible: false,
      isFirst: true,
    })
  );

  // Animate letters
  letters.value.forEach((_, index: number): void => {
    setTimeout((): void => {
      if (letters.value[index]) {
        letters.value[index].visible = true;
      }
    }, index * 100 + 400);
  });

  const nameAnimationDuration: number = letters.value.length * 100 + 400;

  // Stagger content lines animation
  contentLines.value.forEach((_, index) => {
    setTimeout(() => {
      contentLines.value[index] = true;
    }, nameAnimationDuration + 400 + index * 200);
  });
});

useHead({
  title: "Uses - Atif Mehmood",
  meta: [
    {
      name: "description",
      content: "Tools, software, and hardware that I use for development.",
    },
  ],
});
useSeoMeta({
  title: "Uses - Atif Mehmood's Development Setup",
  ogTitle: "Uses - Atif Mehmood's Development Setup",
  description:
    "Discover the development tools, software, and hardware that Atif Mehmood uses for frontend development with Vue.js, Nuxt, and Firebase.",
  ogDescription:
    "Discover the tools and tech stack used by Atif Mehmood for frontend development.",
  keywords:
    "developer setup, development tools, VS Code, Warp Terminal, MacBook M1 Air, Nuxt 3, TailwindCSS, TypeScript, Firebase, frontend development tools",
  ogType: "website",
  ogUrl: "https://hiatif.vercel.app/uses",
  ogImage: "/og/og-uses.png",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterTitle: "Uses - Atif Mehmood's Development Setup",
  twitterDescription:
    "Discover the tools and tech stack used by Atif Mehmood for frontend development.",
  twitterImage: "/og/og-uses.png",
  robots: "index, follow",
});
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="mx-auto max-w-80 md:max-w-96 w-full -mt-20">
      <!-- Animated Title -->
      <div class="flex justify-start w-full">
        <span
          v-for="(letter, index) in letters"
          :key="index"
          class="text-7xl sm:text-8xl font-light transition-all duration-500 transform dark:text-white"
          :class="{
            'opacity-0 translate-y-2 rotate-2': !letter.visible,
            'opacity-100 translate-y-0 rotate-0': letter.visible,
          }"
        >
          {{ letter.char }}
        </span>
      </div>

      <!-- Content Sections -->
      <div class="space-y-4 mt-8">
        <section class="space-y-2">
          <div class="space-y-3">
            <p class="text-base font-light dark:text-white">
              <span
                class="bio-span"
                :class="{
                  'opacity-0 translate-y-2': !contentLines[0],
                  'opacity-100 translate-y-0': contentLines[0],
                }"
              >
                VS Code, Warp Terminal, Dank Mono
              </span>
            </p>
            <p class="text-base font-light dark:text-white">
              <span
                class="bio-span"
                :class="{
                  'opacity-0 translate-y-2': !contentLines[1],
                  'opacity-100 translate-y-0': contentLines[1],
                }"
              >
                Nuxt 3, TailwindCSS, TypeScript and Firebase
              </span>
            </p>
            <p class="text-base font-light dark:text-white">
              <span
                class="bio-span"
                :class="{
                  'opacity-0 translate-y-2': !contentLines[2],
                  'opacity-100 translate-y-0': contentLines[2],
                }"
              >
                MacBook M1 Air, AirPods Gen 2
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bio-span {
  @apply block text-sm sm:text-base max-w-[400px] leading-5;
  @apply md:max-w-[208px] md:hover:max-w-[400px];
  transition: max-width 300ms ease-in-out, opacity 500ms ease-out,
    transform 500ms ease-out;
}

@media (min-width: 768px) {
  .bio-span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
