<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3 mb-4">
            <router-link to="/" class="navbar-brand">Style Besda</router-link>

            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav" v-if="isAuthenticated">
                    <li class="nav-item">
                        <router-link class="nav-link" to="#">Wardrobe</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="#">My looks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="d-inline-flex text-decoration-none" to="/my-profile">
                            <div
                                class="avatar"
                                :style="{ backgroundImage: 'url(' + avatar + ')' }"
                            ></div>
                            <a class="username nav-link">{{ userName }}</a>
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Sign in</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/registration">Sign up</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            isAuthenticated: false,
            userName: null,
            avatar: "https://upload.wikimedia.org/wikipedia/ru/thumb/9/9e/Lenin._Sculptors_Bogolyubov_and_Ingal._1950.png/240px-Lenin._Sculptors_Bogolyubov_and_Ingal._1950.png",
        };
    },

    async mounted() {
        const res = await axios.get("http://localhost:3000/me", { withCredentials: true });
        if (res.data.name) {
            this.isAuthenticated = true;
            this.userName = res.data.name;
            this.avatar = res.data.avatar || this.avatar;
        }
    },
};
</script>

<style scoped>
.avatar {
    margin-left: 1.5rem;

    width: 40px;
    height: 40px;
    background-size: cover;
    background-position: top center;
    border-radius: 50%;
}

.username {
    padding-left: 0.5rem;
}

.navbar-nav {
    height: 2.5rem;
    margin: 0.5rem 0 0.5rem 0;
}
</style>
