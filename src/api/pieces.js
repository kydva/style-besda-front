import http from "./http";

export default {
    async create(data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return await http.post("pieces", formData);
    },

    async delete(id) {
        return await http.delete("pieces/" + id);
    },

    async get(query) {
        return await http.get("pieces", {params: query});
    },

    async addToWardrobe(pieceId) {
        return await http.put("users/me/wardrobe/" + pieceId);
    },

    async removeFromWardrobe(pieceId) {
        return await http.delete("users/me/wardrobe/" + pieceId);
    }
};