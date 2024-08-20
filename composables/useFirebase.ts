import { useNuxtApp } from 'nuxt/app';
import { auth } from '~/plugins/firebase.client';

export function useFirebase() {
  const nuxtApp = useNuxtApp();
  return {
    $auth: nuxtApp.$auth,
  };
}