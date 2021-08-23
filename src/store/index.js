import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import pieceCategories from "./modules/piece-categories";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        pieceCategories
    }
});