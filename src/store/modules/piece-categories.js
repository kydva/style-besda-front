import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import categoriesApi from "../../api/piece-categories";

export default {
    state: {
        categories: []
    },

    actions: {
        async [actions.FETCH_CATEGORIES]({ commit }, query) {
            const res = await categoriesApi.get(query);
            commit(mutations.SET_CATEGORIES, res.data.categories);
        },

        async [actions.ADD_CATEGORY]({ dispatch }, category) {
            await categoriesApi.create(category);
            await dispatch(actions.FETCH_CATEGORIES);
        },

        async [actions.REMOVE_CATEGORY]({ dispatch }, categoryId) {
            await categoriesApi.delete(categoryId);
            await dispatch(actions.FETCH_CATEGORIES);
        },

        async [actions.UPDATE_CATEGORY]({ dispatch }, category) {
            await categoriesApi.update(category.id, {name: category.name});
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