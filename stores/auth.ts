import { defineStore } from "pinia";
import { GoogleAuthProvider, signInWithPopup, type Auth } from "firebase/auth";
import { useFirebase } from "~/composables/useFirebase";
import { navigateTo } from "nuxt/app";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as null | any,
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const { $auth } = useFirebase();
      this.loading = true;
      try {
        const userCredential = await signInWithPopup($auth as Auth, provider);
        this.user = userCredential.user;
        navigateTo("/");
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
    },
  },
});
