// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Atif Mehmood - Frontend Developer",
      meta: [
        {
          name: "description",
          content:
            "Frontend developer specializing in Nuxt and Vue.js. Building modern web applications with a focus on performance and user experience.",
        },
        { name: "format-detection", content: "telephone=no" },
        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Atif Mehmood - Frontend Developer" },
        {
          property: "og:description",
          content:
            "Frontend developer specializing in Nuxt and Vue.js. Building modern web applications with a focus on performance and user experience.",
        },
        { property: "og:image", content: "/og-image.jpg" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Atif Mehmood - Frontend Developer" },
        {
          name: "twitter:description",
          content:
            "Frontend developer specializing in Nuxt and Vue.js. Building modern web applications with a focus on performance and user experience.",
        },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      link: [
        {
          rel: "icon",
          media: "(prefers-color-scheme: light)",
          href: "/favicon/favicon-light.ico",
        },
        {
          rel: "icon",
          media: "(prefers-color-scheme: dark)",
          href: "/favicon/favicon-dark.ico",
        },
        {
          rel: "alternate icon",
          type: "image/png",
          href: "/favicon/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
  ],

  googleFonts: {
    families: {
      "Gilda Display": true,
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
});
