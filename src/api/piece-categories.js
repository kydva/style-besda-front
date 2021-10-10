import http from "./http";

export default {
    async get(query) {
        return await http.get("piece-categories", {params: query});
    },

    async create(data) {
        return await http.post("piece-categories", data);
    },

    async delete(id) {
        return await http.delete("piece-categories/" + id);
    },

    async update(id, data) {
        return await http.patch("piece-categories/" + id, data);
    }
};