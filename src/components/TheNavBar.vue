<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3 mb-4">
            <router-link to="/" class="navbar-brand">Style Besda</router-link>

            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav" v-if="isAuthenticated">
                    <li class="nav-item">
                        <div class="dropdown">
                            <router-link class="nav-link" to="/wardrobe"
                                >Wardrobe <i class="fas fa-caret-down"></i>
                            </router-link>
                            <div class="dropdown-content">
                                <router-link to="/wardrobe">My wardrobe</router-link>
                                <router-link to="/wardrobe/fill-up">Fill up</router-link>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="dropdown">
                            <router-link class="nav-link" to="/looks/discover"
                                >Looks <i class="fas fa-caret-down"></i>
                            </router-link>
                            <div class="dropdown-content">
                                <router-link to="/looks/discover">Discover</router-link>
                                <router-link to="/looks/favorites">Favorites</router-link>
                                <router-link to="/looks/create">Create new look</router-link>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link class="d-inline-flex text-decoration-none" to="/my-profile">
                            <div class="avatar" :style="avatarStyle"></div>
                            <a class="username nav-link">{{ user.name }}</a>
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Sign in</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">Sign up</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["user", "isAuthenticated", "isAdmin"]),
        avatarStyle() {
            const avatar =
                this.user.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/6/68/Young_stalin_screenshot.jpg";
            return {
                backgroundImage: "url(" + avatar + ")",
            };
        },
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
