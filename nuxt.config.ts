export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    "@nuxt/content",
    "@nuxtjs/leaflet"
  ],
  css: ["/assets/global.css", 'leaflet/dist/leaflet.css'],
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL,
  },
})
