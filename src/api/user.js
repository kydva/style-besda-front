import http from "./http";

export default {
    async login(credentials) {
        return await http.post("login", credentials);
    },

    async register(data) {
        return await http.post("register", data);
    },

    async logout() {
        return await http.get("logout");
    },

    async getUser() {
        return await http.get("users/me");
    },

    async updateUser(data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return await http.patch("users/me", formData);
    }
};