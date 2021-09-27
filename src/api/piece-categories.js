import http from "./http";

export default {
    async get() {
        return await http.get("piece-categories");
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