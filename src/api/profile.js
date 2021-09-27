import http from "./http";

export default {
    async get(id) {
        return await http.get("users/" + id, {withCredentials: false});
    }
};