import * as actions from "../actions.type";

import axios from "axios";

export default {
    actions: {
        async [actions.ADD_PIECE](context, piece){
            const formData = new FormData();
            Object.keys(piece).forEach((key) => {
                formData.append(key, piece[key]);
            });
            await axios.post("http://localhost:3000/pieces", formData, {withCredentials: true});
        }
    },
    namespaced: true
};