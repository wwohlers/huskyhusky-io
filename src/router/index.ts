import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/HomeView.vue";
import store from "../store";
import auth from "@/auth/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/article/:name",
    name: "Article",
    component: () => import("../views/ArticleView.vue")
  },
  {
    path: "/archive",
    name: "Archive",
    component: () => import("../views/ArchiveView.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue")
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignInView.vue")
  },
  {
    path: "/write",
    name: "Write",
    meta: { requiresAuth: true },
    component: () => import("../views/WriteView.vue")
  },
  {
    path: "/edit/:id",
    name: "Edit",
    meta: { requiresAuth: true },
    component: () => import("../views/EditView.vue")
  },
  {
    path: "/account",
    name: "Account",
    meta: { requiresAuth: true },
    component: () => import("../views/AccountView.vue")
  }
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Router guard that protects user-only and admin-only routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth || to.meta.requiresAdmin) {
    const int = setInterval(() => {
      // Wait for auth to be resolved
      if (!store.getters.isAuthenticated || store.getters.user) {
        clearInterval(int);
        if (!store.getters.isAuthenticated) return next({ name: 'SignIn' });
        if (to.meta.requiresAdmin && !store.getters.user.admin) return next({ name: 'Home' });
        return next();
      }
    }, 100)
  }
  next();
})

export default router;
