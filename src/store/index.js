import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import pieceCategories from "./modules/piece-categories";
import pieces from "./modules/pieces";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        pieceCategories,
        pieces
    }
});