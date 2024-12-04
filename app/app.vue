<script setup lang="ts">
const routes = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "uses", path: "/uses" },
];
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};
</script>
<template>
  <div
    class="font-gilda bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black min-h-screen w-full"
  >
    <button
      @click="toggleColorMode"
      class="absolute top-5 right-5 dark:text-white"
    >
      /{{ colorMode.preference }}
    </button>

    <NuxtPage />
    <nav
      class="fixed bottom-[5%] left-1/2 transform -translate-x-1/2 flex gap-x-16 dark:text-white"
    >
      <NuxtLink
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
        active-class="after:!opacity-100 after:!-translate-y-0"
        exact-active-class="after:!opacity-100 after:!-translate-y-0"
        class="flex after:opacity-0 justify-center items-center flex-col gap-2.5 after:translate-y-2 after:w-1.5 after:h-1.5 dark:after:bg-white after:bg-black after:rounded-full after:transition-all after:duration-300 after:hover:translate-y-0 after:hover:opacity-100"
      >
        /{{ route.name }}
      </NuxtLink>
    </nav>
  </div>
</template>
