import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import axios from "axios";

export default {
    state: {
        categories: []
    },

    actions: {
        async [actions.FETCH_CATEGORIES]({ commit }) {
            const res = await axios.get("http://localhost:3000/piece-categories", {withCredentials: true});
            commit(mutations.SET_CATEGORIES, res.data.categories);
        },

        async [actions.ADD_CATEGORY]({ dispatch }, category) {
            await axios.post("http://localhost:3000/piece-categories", category, { withCredentials: true });
            await dispatch(actions.FETCH_CATEGORIES);
        },

        async [actions.REMOVE_CATEGORY]({ dispatch }, categoryId) {
            await axios.delete(`http://localhost:3000/piece-categories/${categoryId}`, { withCredentials: true });
            await dispatch(actions.FETCH_CATEGORIES);
        },

        async [actions.UPDATE_CATEGORY]({ dispatch }, category) {
            await axios.patch(`http://localhost:3000/piece-categories/${category.id}`, { name: category.name }, { withCredentials: true });
            await dispatch(actions.FETCH_CATEGORIES);
        }
    },

    mutations: {
        [mutations.SET_CATEGORIES](state, categories) {
            state.categories = categories;
        }
    },

    namespaced: true
};