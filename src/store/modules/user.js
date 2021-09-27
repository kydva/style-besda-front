import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import userApi from "../../api/user";

export default {
    state: {
        isAuthenticated: false,
        user: {}
    },

    getters: {
        isAdmin(state) {
            return state.user?.roles?.includes("admin");
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        user(state) {
            return state.user;
        }
    },

    actions: {
        async [actions.LOGIN]({ commit }, credentials) {
            const res = await userApi.login(credentials);
            commit(mutations.SET_USER, res.data.user);
        },

        async [actions.REGISTER]({ dispatch }, userData) {
            await userApi.register(userData);
            await dispatch(actions.FETCH_USER);
        },

        async [actions.LOGOUT]({commit}) {
            await userApi.logout();
            commit(mutations.PURGE_USER);
        },

        async [actions.FETCH_USER]({ commit }) {
            const res = await userApi.getUser();
            if (res.data.user) {
                commit(mutations.SET_USER, res.data.user);
            } else commit(mutations.PURGE_USER);
        },

        async [actions.UPDATE_USER]({dispatch}, data) {
            await userApi.updateUser(data);
            await dispatch(actions.FETCH_USER);
        }
    },

    mutations: {
        [mutations.SET_USER](state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
        [mutations.PURGE_USER](state) {
            state.isAuthenticated = false;
            state.user = {};
        }
    }
};