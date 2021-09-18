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
                            <router-link class="nav-link" to="/looks/recommended"
                                >Looks <i class="fas fa-caret-down"></i>
                            </router-link>
                            <div class="dropdown-content">
                                <router-link to="/looks/recommended">Recommended</router-link>
                                <router-link to="/looks/favorites">Favorites</router-link>
                                <router-link to="/looks/create">Create new look</router-link>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="dropdown">
                            <router-link
                                class="d-inline-flex text-decoration-none"
                                :to="'/users/' + user._id"
                            >
                                <UserAvatar :min="true" :user="user" />
                                <a class="username nav-link"
                                    >{{ user.name }} <i class="fas fa-caret-down"></i
                                ></a>
                            </router-link>
                            <div class="dropdown-content user-dropdown">
                                <router-link to="/my-profile/settings">Settings</router-link>
                                <a href="#" @click.prevent="logout">Logout</a>
                            </div>
                        </div>
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
import { mapActions, mapGetters } from "vuex";
import UserAvatar from "./UserAvatar.vue";

export default {
    components: { UserAvatar },
    computed: {
        ...mapGetters(["user", "isAuthenticated", "isAdmin"]),
    },
    methods: {
        ...mapActions(["logout"])
    }
};
</script>

<style scoped>
.username {
    padding-left: 0.5rem;
}

.navbar-nav {
    height: 2.5rem;
    margin: 0.5rem 0 0.5rem 0;
}

.user-dropdown {
    right: 0;
    text-align: end;
}
</style>
