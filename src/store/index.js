import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import pieceCategories from "./modules/piece-categories";
import pieces from "./modules/pieces";
import looks from "./modules/looks";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        pieceCategories,
        pieces,
        looks,
        profile
    }
});