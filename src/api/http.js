import axios from "axios";

const API_URL = process.env.VUE_APP_BACKEND_URL + "/api/v1/";
axios.defaults.withCredentials = true;

export default {
    async get(resource, config) {
        return await axios.get(API_URL + resource, config); 
    },

    async post(resource, data, config) {
        return await axios.post(API_URL + resource, data, config); 
    },

    async put(resource, data, config) {
        return await axios.put(API_URL + resource, data, config); 
    },

    async patch(resource, data, config) {
        return await axios.patch(API_URL + resource, data, config); 
    },

    async delete(resource, config) {
        return await axios.delete(API_URL + resource, config); 
    },
};
