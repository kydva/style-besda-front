import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.VUE_APP_BASE_URL;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app");
