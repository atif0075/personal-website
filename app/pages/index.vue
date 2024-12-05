<script setup lang="ts">
import type { Letter } from "~/types";

const firstName = "atif";
const lastName = "mehmöd";
const letters = ref<Letter[]>([]);
const bioVisible = ref<boolean>(false);
const socialsVisible = ref<boolean>(false);

onMounted(() => {
  const createLetters = (name: string, isFirst: boolean): Letter[] =>
    [...name].map(
      (char): Letter => ({
        char,
        visible: false,
        isFirst,
      })
    );

  letters.value = [
    ...createLetters(firstName, true),
    ...createLetters(lastName, false),
  ];

  // Animate letters
  letters.value.forEach((_, index: number): void => {
    setTimeout((): void => {
      if (letters.value[index]) {
        letters.value[index].visible = true;
      }
    }, index * 100 + 400);
  });

  const nameAnimationDuration: number = letters.value.length * 100 + 400;

  setTimeout((): void => {
    bioVisible.value = true;
  }, nameAnimationDuration + 200);

  setTimeout((): void => {
    socialsVisible.value = true;
  }, nameAnimationDuration + 600);
});

useHead({
  title: "Atif Mehmood - Frontend Developer Portfolio",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "description",
      content:
        "Frontend developer specializing in Vue.js, Nuxt, and Firebase. Based in Faisalabad, Pakistan. View my projects and get in touch.",
    },
    {
      name: "keywords",
      content:
        "frontend developer, full-stack developer, Vue.js, Nuxt, Firebase, Pakistan, Faisalabad",
    },
    {
      property: "og:title",
      content: "Atif Mehmood - Frontend Developer Portfolio",
    },
    {
      property: "og:description",
      content:
        "Frontend developer specializing in Vue.js, Nuxt, and Firebase. Based in Faisalabad, Pakistan.",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    // Added og:url
    {
      property: "og:url",
      content: "https://hiatif.vercel.app",
    },
    // Added og:image
    {
      property: "og:image",
      content: "/og/og-image.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Atif Mehmood - Frontend Developer Portfolio",
    },
    {
      name: "twitter:description",
      content: "Frontend developer specializing in Vue.js, Nuxt, and Firebase.",
    },
    {
      name: "twitter:image",
      content: "/og/og-image.png",
    },
  ],
  link: [
    { rel: "canonical", href: "https://hiatif.vercel.app" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center">
    <div class="mx-auto max-w-80 md:max-w-96">
      <div
        v-for="(isFirst, index) in [true, false]"
        :key="index"
        class="flex justify-start"
      >
        <span
          v-for="(letter, index) in letters.filter(
            (l) => l.isFirst === isFirst
          )"
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
      <div class="space-y-1 mt-5 max-w-80 md:max-w-96">
        <p
          class="text-base font-light dark:text-white block transition-[opacity,transform] duration-500 transform"
          :class="{
            'opacity-0 translate-y-2': !bioVisible,
            'opacity-100 translate-y-0': bioVisible,
          }"
        >
          <span class="bio-span relative">
            frontend developer, sometimes full-stack(Firebase)
          </span>
        </p>
        <p
          class="text-base font-light dark:text-white block transition-[opacity,transform] duration-500 transform"
          :class="{
            'opacity-0 translate-y-2': !bioVisible,
            'opacity-100 translate-y-0': bioVisible,
          }"
          style="transition-delay: 100ms"
        >
          <span class="bio-span"> loves Nuxt, Open Source, and Cricket. </span>
        </p>
        <p
          class="text-sm sm:text-base font-light dark:text-white block transition-[opacity,transform] duration-500 transform"
          :class="{
            'opacity-0 translate-y-2': !bioVisible,
            'opacity-100 translate-y-0': bioVisible,
          }"
          style="transition-delay: 200ms"
        >
          living in 🇵🇰 Faisalabad
        </p>
      </div>
      <div
        class="mt-5 flex gap-x-2 text-xs"
        :class="{
          'opacity-0 translate-y-2': !socialsVisible,
          'opacity-100': socialsVisible,
        }"
      >
        <LinkPreview url="https://github.com/atif0075"> github </LinkPreview>
        <LinkPreview url="https://linkedin.com/in/atif0075">
          linkedin
        </LinkPreview>
        <LinkPreview url="https://facebook.com/atif0075">
          facebook
        </LinkPreview>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bio-span {
  @apply block text-sm sm:text-base max-w-[400px] leading-5 md:truncate md:hover:max-w-[400px] md:max-w-[208px] transition-all duration-300;
}
</style>
