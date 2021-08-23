import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    { name: "home", path: "/", component: () => import("@/views/Home") },
    { name: "login", path: "/login", component: () => import("@/views/Login"), meta: { guest: true } },
    { name: "register", path: "/register", component: () => import("@/views/Register"), meta: { guest: true } },
    { name: "categories", path: "/admin/categories", component: () => import("@/views/admin/Categories"), meta: { admin: true } }
];

const router = new VueRouter({ routes, mode: "history" });

router.beforeResolve((to, from, next) => {
    if (to.meta.guest && store.getters.isAuthenticated) {
        return next(false);
    }

    if (to.meta.admin && !store.getters.isAdmin) {
        return next(false);
    }

    if (to.meta.authenticated && !store.getters.isAuthenticated) {
        return next("/login");
    }

    next();
});

export default router;