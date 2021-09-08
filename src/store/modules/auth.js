import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import axios from "axios";

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
            const res = await axios.post("http://localhost:3000/login", credentials, { withCredentials: true });
            commit(mutations.SET_USER, res.data.user);
        },

        async [actions.REGISTER]({ dispatch }, userData) {
            await axios.post("http://localhost:3000/register", userData, { withCredentials: true });
            dispatch(actions.FETCH_USER);
        },

        async [actions.FETCH_USER]({ commit }) {
            const res = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
            if (res.data.user) {
                commit(mutations.SET_USER, res.data.user);
            } else commit(mutations.PURGE_USER);
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