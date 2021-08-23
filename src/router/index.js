import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { name: "home", path: "/", component: () => import("@/views/Home") },
    { name: "login", path: "/login", component: () => import("@/views/Login"), meta: { guest: true } },
    { name: "register", path: "/register", component: () => import("@/views/Register"), meta: { guest: true } },
    { name: "categories", path: "/admin/categories", component: () => import("@/views/admin/Categories"), meta: { admin: true } }
];

const router = new VueRouter({ routes, mode: "history" });

export default router;