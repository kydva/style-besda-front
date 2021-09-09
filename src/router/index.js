import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Wardrobe from "@/views/Wardrobe";
import Looks from "@/views/Looks";

Vue.use(VueRouter);

const routes = [
    { name: "home", path: "/", component: () => import("@/views/Home") },
    { name: "login", path: "/login", component: () => import("@/views/Login"), meta: { guest: true } },
    { name: "register", path: "/register", component: () => import("@/views/Register"), meta: { guest: true } },
    { name: "wardrobe", path: "/wardrobe", component: Wardrobe, meta: { isAuthenticated: true } },
    { name: "wardrobe-fill", path: "/wardrobe/fill-up", component: Wardrobe, props: { filling: true }, meta: { isAuthenticated: true } },
    { name: "looks-discover", path: "/looks/discover", component: Looks, meta: { isAuthenticated: true } },
    { name: "looks-create", path: "/looks/create", component: () => import("@/views/LookCreate.vue"), meta: { isAuthenticated: true } },
    { name: "categories", path: "/admin/categories", component: () => import("@/views/admin/Categories"), meta: { admin: true } },
    { name: "pieces", path: "/admin/pieces", component: () => import("@/views/admin/Pieces"), meta: {admin: true}}
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