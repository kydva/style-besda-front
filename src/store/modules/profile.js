import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import profileApi from "../../api/profile";

export default {
    state: {
        profile: {}
    },

    actions: {
        async [actions.FETCH_PROFILE]({commit}, id) {
            const res = await profileApi.get(id);
            commit(mutations.SET_PROFILE, res.data.user);
        }
    },

    mutations: { 
        [mutations.SET_PROFILE](state, profile) {
            state.profile = profile;
        }
    },

    namespaced: true
};