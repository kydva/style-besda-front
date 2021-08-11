import Vue from "vue"
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {name: 'home', path: '/', component: () => import('@/views/Home')},
    {name: 'login', path: '/login', component: () => import('@/views/Login')},
    {name: 'registration', path: '/registration', component: () => import('@/views/Registration')}
]


export default new VueRouter({routes, mode: 'history'})