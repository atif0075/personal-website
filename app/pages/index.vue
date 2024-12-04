<script setup>
import { ref, onMounted } from "vue";

const firstName = "atif";
const lastName = "mehmöd";
const letters = ref([]);
const bioVisible = ref(false);
const socialsVisible = ref(false);

onMounted(() => {
  const createLetters = (name, isFirst) =>
    [...name].map((char) => ({ char, visible: false, isFirst }));

  letters.value = [
    ...createLetters(firstName, true),
    ...createLetters(lastName, false),
  ];

  // Animate letters
  letters.value.forEach((_, index) =>
    setTimeout(() => (letters.value[index].visible = true), index * 100 + 400)
  );

  // Animate bio section after name animation
  const nameAnimationDuration = letters.value.length * 100 + 400;
  setTimeout(() => {
    bioVisible.value = true;
  }, nameAnimationDuration + 200);

  // Animate socials after bio
  setTimeout(() => {
    socialsVisible.value = true;
  }, nameAnimationDuration + 600);
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center">
    <div class="mx-auto max-w-80 md:max-w-96">
      <div
        v-for="isFirst in [true, false]"
        :key="isFirst"
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
          class="text-base font-light dark:text-white block transition-all duration-500 transform"
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
          class="text-base font-light dark:text-white block transition-all duration-500 transform"
          :class="{
            'opacity-0 translate-y-2': !bioVisible,
            'opacity-100 translate-y-0': bioVisible,
          }"
          style="transition-delay: 100ms"
        >
          <span class="bio-span"> loves Nuxt, Open Source, and Cricket. </span>
        </p>
        <p
          class="text-sm sm:text-base font-light dark:text-white block transition-all duration-500 transform"
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
        class="mt-5 flex items-center gap-x-2 transition-all duration-500 transform"
        :class="{
          'opacity-0 translate-y-2': !socialsVisible,
          'opacity-100 translate-y-0': socialsVisible,
        }"
      >
        <Icon
          @click="openLink('https://github.com/atif0075')"
          name="ion:logo-github"
          class="text-black dark:text-white cursor-alias"
        />
        <Icon
          @click="openLink('https://linkedin.com/in/atif0075')"
          name="ion:logo-linkedin"
          class="text-black dark:text-white cursor-alias"
        />
        <Icon
          @click="openLink('https://facebook.com/atif0075')"
          name="ion:logo-facebook"
          class="text-black dark:text-white cursor-alias"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.bio-span {
  @apply block text-sm sm:text-base max-w-[400px] leading-5 md:truncate md:hover:max-w-[400px] md:max-w-[208px] transition-all duration-300;
}
</style>
