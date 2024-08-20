import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { firebase } = config.public;

  const app = initializeApp({ ...firebase as any });

  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  auth.languageCode = "th";

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});
