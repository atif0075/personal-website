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

useSeoMeta({
  title: "Atif Mehmood - Frontend Developer Portfolio",
  ogTitle: "Atif Mehmood - Frontend Developer Portfolio",
  description:
    "Frontend developer specializing in Vue.js, Nuxt, and Firebase. Based in Faisalabad, Pakistan. View my projects and get in touch.",
  ogDescription:
    "Frontend developer specializing in Vue.js, Nuxt, and Firebase. Based in Faisalabad, Pakistan.",
  keywords:
    "frontend developer, full-stack developer, Vue.js, Nuxt, Firebase, Pakistan, Faisalabad",
  ogType: "website",
  ogLocale: "en_US",
  ogUrl: "https://hiatif.vercel.app",
  ogImage: "/og/og-image.png",
  twitterCard: "summary_large_image",
  twitterTitle: "Atif Mehmood - Frontend Developer Portfolio",
  twitterDescription:
    "Frontend developer specializing in Vue.js, Nuxt, and Firebase.",
  twitterImage: "/og/og-image.png",
  robots: "index, follow",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Atif Mehmood",
        jobTitle: "Frontend Developer",
        url: "https://hiatif.vercel.app",
        sameAs: [
          "https://github.com/atif0075",
          "https://linkedin.com/in/atif0075",
          "https://facebook.com/atif0075",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Faisalabad",
          addressCountry: "Pakistan",
        },
      }),
    },
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
        <LinkPreview
          isStatic
          imageSrc="https://awesomescreenshot.s3.amazonaws.com/image/2101513/52052145-daf7c2e3f7afa8e387cea7ce91abdcfb.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241214T134501Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=6edb4b9fb28004e4925951aba9590946a2fd3db7219f5676a005aa0af829dcca"
        >
          linkedin
        </LinkPreview>
        <LinkPreview
          isStatic
          imageSrc="https://awesomescreenshot.s3.amazonaws.com/image/2101513/52052049-23902999f7e9ff3e44769df0f5dbb7ab.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241214T131904Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=c4d83f643a79a8d348bdc56b996d0c1285f6c63e4034a363fc1f72fc4b52d2f3"
        >
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
