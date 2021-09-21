<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3 mb-4">
            <router-link to="/" class="navbar-brand">Style Besda</router-link>
            <div class="navbar-toggler">
                <Slide closeOnNavigation right noOverlay class="nav-item">
                    <template v-if="isAuthenticated">
                        <span class="menu-section-name">Wardrobe</span>
                        <router-link to="/wardrobe">My wardrobe</router-link>
                        <router-link to="/wardrobe/fill-up">Fill up</router-link>
                        <span class="menu-section-name">Looks</span>
                        <router-link to="/looks/recommended">Recommended</router-link>
                        <router-link to="/looks/favorites">Favorites</router-link>
                        <router-link to="/looks/create">Create new look</router-link>
                        <span class="menu-section-name">Profile</span>
                        <router-link :to="'/users/' + user._id">My profile</router-link>
                        <router-link to="/my-profile/settings">Settings</router-link>
                        <a href="#" @click.prevent="logout">Logout</a>
                    </template>
                    <template v-else>
                        <router-link to="/login">Sign in</router-link>
                        <router-link to="/register">Sign up</router-link>
                    </template>
                </Slide>
            </div>
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
import { Slide } from "vue-burger-menu";

export default {
    components: { UserAvatar, Slide },
    computed: {
        ...mapGetters(["user", "isAuthenticated", "isAdmin"]),
    },
    methods: {
        ...mapActions(["logout"]),
    },
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

.menu-section-name {
    padding: 1rem;
    font-weight: bold;
    color: whitesmoke;
}
</style>

<style>
.bm-burger-bars {
    background-color: rgb(231, 231, 231);
}

.bm-burger-button {
    position: relative;
    top: 0;
    left: 0 !important;
}

.bm-item-list > * {
    justify-content: flex-end;
    padding: 0.4rem;
}

.bm-item-list > a {
    text-decoration: none;
    color: inherit;
}

.bm-item-list > * > a {
    text-decoration: none;
    color: inherit;
}

.bm-item-list {
    margin-left: 0;
    margin-right: 10%;
}

.cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
}
</style>