import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import looksApi from "../../api/looks";

export default {
    state: {
        looks: [],
        look: {},
        totalResults: null
    },
    actions: {
        async [actions.FETCH_LOOK]({commit}, id) {
            const res = await looksApi.getLook(id);
            commit(mutations.SET_LOOK, res.data.look);
        },
        async [actions.DELETE_LOOK](context, id){
            await looksApi.delete(id);
        },
        async [actions.ADD_LOOK](context, look) {
            const formData = new FormData();
            Object.keys(look).forEach((key) => {
                formData.append(key, look[key]);
            });
            await looksApi.create(formData);
        },
        async [actions.FETCH_LOOKS]({commit, state}, query) {
            const res = await looksApi.getLooks(query);
            if (query.skip === state.looks.length && query.skip !== 0) {
                commit(mutations.ADD_LOOKS, res.data.looks);
            } else {
                commit(mutations.SET_LOOKS, res.data.looks);
                commit(mutations.SET_TOTAL_RESULTS, res.data.totalResults);
            }
        },
        async [actions.ADD_TO_FAVORITES]({commit}, lookId){
            await looksApi.addToFavorites(lookId);
            commit(mutations.ADD_TO_FAVORITES, lookId);
        },
        async [actions.REMOVE_FROM_FAVORITES]({commit}, lookId){
            await looksApi.removeFromFavorites(lookId);
            commit(mutations.REMOVE_FROM_FAVORITES, lookId);
        },
        async [actions.DISLIKE_LOOK]({commit}, lookId){
            await looksApi.dislike(lookId);
            commit(mutations.DISLIKE_LOOK, lookId);
        },
        async [actions.CANCEL_LOOK_DISLIKE]({commit}, lookId){
            await looksApi.cancelDislike(lookId);
            commit(mutations.CANCEL_LOOK_DISLIKE, lookId);
        }
    },
    mutations: {
        [mutations.SET_LOOK](state, look) {
            state.look = look;
        },
        [mutations.SET_LOOKS](state, looks){
            state.looks = looks;
        },
        [mutations.ADD_LOOKS](state, looks) {
            state.looks = state.looks.concat(looks);
        },
        [mutations.PURGE_LOOKS](state) {
            state.looks = [];
        },
        [mutations.SET_TOTAL_RESULTS](state, count){
            state.totalResults = count;
        },
        [mutations.ADD_TO_FAVORITES](state, lookId){
            state.looks = state.looks.map((look) => {
                if (look._id === lookId) {
                    look.isLiked = true;
                }
                return look;
            });
        },
        [mutations.REMOVE_FROM_FAVORITES](state, lookId){
            state.looks = state.looks.map((look) => {
                if (look._id === lookId) {
                    look.isLiked = false;
                }
                return look;
            });
        },
        [mutations.DISLIKE_LOOK](state, lookId){
            state.looks = state.looks.map((look) => {
                if (look._id === lookId) {
                    look.isDisliked = true;
                }
                return look;
            });
        },
        [mutations.CANCEL_LOOK_DISLIKE](state, lookId){
            state.looks = state.looks.map((look) => {
                if (look._id === lookId) {
                    look.isDisliked = false;
                }
                return look;
            });
        },
    },
    namespaced: true
};