import * as actions from "../actions.type";
import * as mutations from "../mutations.type";
import axios from "axios";

export default {
    state: {
        looks: []
    },
    actions: {
        async [actions.ADD_LOOK](context, look) {
            const formData = new FormData();
            Object.keys(look).forEach((key) => {
                formData.append(key, look[key]);
            });
            await axios.post("http://localhost:3000/looks", formData, {withCredentials: true});
        },
        async [actions.FETCH_LOOKS]({commit}) {
            const res = await axios.get("http://localhost:3000/looks", {withCredentials: true});
            commit(mutations.SET_LOOKS, res.looks);
        }
    },
    namespaced: true
};