import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuthStore();

  if (!user.isLoggedIn) {
    return navigateTo("/login");
  }
});
