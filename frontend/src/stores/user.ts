// Utilities
import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    user(state) {
      return state.user;
    },
  },
  actions: {
    register(email: string, password: string) {
      // const response = await $firebaseAuth.createUserWithEmailAndPassword()
    },
    logout() {
      this.user = null;
    },
  },
});
