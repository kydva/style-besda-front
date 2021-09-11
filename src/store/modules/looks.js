import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import axios from "axios";

export default {
    state: {
        looks: [],
        totalResults: null
    },
    actions: {
        async [actions.ADD_LOOK](context, look) {
            const formData = new FormData();
            Object.keys(look).forEach((key) => {
                formData.append(key, look[key]);
            });
            await axios.post("http://localhost:3000/looks", formData, {withCredentials: true});
        },
        async [actions.FETCH_LOOKS]({commit, state}, query) {
            const res = await axios.get("http://localhost:3000/looks", {params: query, withCredentials: true});
            if (query.skip === state.looks.length && query.skip !== 0) {
                commit(mutations.ADD_LOOKS, res.data.looks);
            } else {
                commit(mutations.SET_LOOKS, res.data.looks);
                commit(mutations.SET_TOTAL_RESULTS, res.data.totalResults);
            }
        }
    },
    mutations: {
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
        }
    },
    namespaced: true
};