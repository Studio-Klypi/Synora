// https://nuxt.com/docs/api/configuration/nuxt-config
import vue from "@vitejs/plugin-vue";

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "nuxt-scheduler",
    "nuxt-mailer",
  ],
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    mailerSecure: "",
    mailerUser: "",
    mailerPass: "",
    mailerHost: "",
    mailerPort: "",
    mailerFromEmail: "",
    mailerFromName: "",
    public: {
      appUrl: "",
    },
  },
  compatibilityDate: "2024-11-01",
  nitro: {
    rollupConfig: {
      plugins: [
        vue(),
      ],
    },
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  googleFonts: {
    families: {
      Montserrat: {
        wght: "100..900",
        ital: "100..900",
      },
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "fr",
    locales: [
      {
        code: "fr",
        language: "fr_FR",
        file: "fr.json",
      },
    ],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: false,
  },
});
