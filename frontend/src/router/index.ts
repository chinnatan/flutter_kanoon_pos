// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

const generateTitle = (title: string) =>
  `${title} - ${import.meta.env.VITE_TITLE}`;

const routesPath = [
  {
    path: "/",
    name: "login",
    meta: { title: generateTitle("เข้าสู่ระบบ") },
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: generateTitle("สมัครสมาชิก") },
    component: () => import("@/pages/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesPath,
});

router.beforeEach((to) => {
  document.title = to.meta.title || import.meta.env.VITE_TITLE;
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
