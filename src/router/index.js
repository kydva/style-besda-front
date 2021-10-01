import Vue from "vue";
import VueRouter from "vue-router";
import Wardrobe from "@/views/Wardrobe";
import Looks from "@/views/Looks";
import { FETCH_USER } from "../store/actions.type";
//import router.app.$store from "../router.app.$store";

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
    { name: "categories", path: "/admin/categories", component: () => import("@/views/admin/Categories"), meta: { admin: true } },
    { name: "pieces", path: "/admin/pieces", component: () => import("@/views/admin/Pieces"), meta: { admin: true } }
];

const router = new VueRouter({ routes, mode: "history" });

router.beforeResolve(async (to, from, next) => {
        if (!router.app.$store.getters.isAuthenticated) {
            await router.app.$store.dispatch(FETCH_USER);
        }
        const isAuthenticated = router.app.$store.getters.isAuthenticated;
        if (to.name === "home" && isAuthenticated) {
            return next("/looks/recommended");
        }
    
        if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
            return next(false);
        }
    
        if (to.matched.some(record => record.meta.admin) && !router.app.$store.getters.isAdmin) {
            return next(false);
        }
    
        if (to.matched.some(record => record.meta.authenticated) && !isAuthenticated) {
            return next("/login");
        }
    
        next();
    
});

export default router;