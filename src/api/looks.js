import http from "./http";

export default {
    async getLook(id) {
        return await http.get("looks/" + id);
    },

    async delete(id) {
        return await http.delete("looks/" + id);
    },

    async create(data) {
        const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
        return await http.post("looks", formData);
    },

    async getLooks(query) {
        return await http.get("looks", {params: query});
    },

    async addToFavorites(lookId) {
        return await http.put("users/me/favorites/" + lookId);
    },

    async removeFromFavorites(lookId) {
        return await http.delete("/users/me/favorites/" + lookId);
    },

    async dislike(lookId) {
        return await http.put("users/me/hidden-looks/" + lookId);
    },

    async cancelDislike(lookId) {
        return await http.delete("users/me/hidden-looks/" + lookId);
    }
};