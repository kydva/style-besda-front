import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { name: "home", path: "/", component: () => import("@/views/Home") },
    { name: "login", path: "/login", component: () => import("@/views/Login") },
    { name: "register", path: "/registration", component: () => import("@/views/Registration") },
    { name: "categories", path: "/admin/categories", component: () => import("@/views/admin/Categories") }
];

const router = new VueRouter({ routes, mode: "history" });

export default router;