import Vue from "vue";
import VueRouter from "vue-router";
import Wardrobe from "@/views/Wardrobe";
import Looks from "@/views/Looks";
import { FETCH_USER } from "../store/actions.type";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    { name: "home", path: "/", component: () => import("@/views/Home") },
    { name: "login", path: "/login", component: () => import("@/views/Login"), meta: { guest: true } },
    { name: "register", path: "/register", component: () => import("@/views/Register"), meta: { guest: true } },
    { name: "profile", path: "/users/:id", component: () => import("@/views/Profile") },
    { name: "profile-settings", path: "/my-profile/settings", component: () => import("@/views/ProfileSettings"), meta: { authenticated: true } },
    { name: "wardrobe", path: "/wardrobe", component: Wardrobe, meta: { authenticated: true } },
    { name: "wardrobe-fill", path: "/wardrobe/fill-up", component: Wardrobe, props: { filling: true }, meta: { authenticated: true } },
    { name: "looks-recommended", path: "/looks/recommended", component: Looks, meta: { authenticated: true } },
    { name: "looks-favorites", path: "/looks/favorites", component: Looks, props: { favorites: true }, meta: { authenticated: true } },
    { name: "looks-create", path: "/looks/create", component: () => import("@/views/LookCreate"), meta: { authenticated: true } },
    { name: "look", path: "/looks/:id", component: () => import("@/views/Look") },
    { name: "admin-category-create", path: "/admin/categories/create", component: () => import("@/views/admin/CategoryCreate"), meta: { admin: true } },
    { name: "admin-category-edit", path: "/admin/categories/edit", component: () => import("@/views/admin/CategoryEdit"), meta: { admin: true } },
    { name: "admin-pieces", path: "/admin/pieces", component: () => import("@/views/admin/Pieces"), meta: { admin: true } }
];

const router = new VueRouter({ routes, mode: "history" });

router.beforeResolve(async (to, from, next) => {
        if (!store.getters.isAuthenticated) {
            await store.dispatch(FETCH_USER);
        }

        if (to.name === "home" && store.getters.isAuthenticated) {
            return next("/looks/recommended");
        }
    
        if (to.matched.some(record => record.meta.guest) && store.getters.isAuthenticated) {
            return next(false);
        }
    
        if (to.matched.some(record => record.meta.admin) && !store.getters.isAdmin) {
            return next(false);
        }
    
        if (to.matched.some(record => record.meta.authenticated) && !store.getters.isAuthenticated) {
            return next("/login");
        }
    
        next();
    
});

export default router;