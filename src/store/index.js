import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import pieceCategories from "./modules/piece-categories";
import pieces from "./modules/pieces";
import looks from "./modules/looks";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        pieceCategories,
        pieces,
        looks
    }
});