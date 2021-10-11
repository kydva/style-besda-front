<template>
    <div class="container">
        <div class="my-4 row justify-content-center">
            <div class="d-flex flex-column col-lg-3">
                <div class="mx-auto">
                    <UserAvatar class="my-1" :user="profile" />
                    <div class="profile-name">{{ profile.name }}</div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="bg-light p-3 mb-2 text-secondary rounded">
                    Registered at: {{ registeredAt }}
                </div>
                <div class="bg-light p-3 mb-2 text-secondary rounded">
                    Gender: {{ profile.gender == "M" ? "Male" : "Female" }}
                </div>
                <div class="bg-light p-3 mb-2 text-secondary rounded">
                    Items in wardrobe: {{ profile.wardrobe.length }}
                </div>
                <div class="bg-light p-3 text-secondary rounded">
                    Created looks: {{ profile.looks.length }}
                </div>
                <div class="row m-0 bg-light">
                    <div
                        class="look col-xl-2 col-lg-3 col-md-2 col-sm-3"
                        v-for="look in profile.looks"
                        :key="look._id"
                    >
                        <div class="look-img-container">
                            <router-link :to="'/looks/' + look._id">
                                <img
                                    :src="$baseUrl + '/img/looks/' + look.img"
                                    class="img-fluid rounded look-img"
                                />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_PROFILE } from "../store/actions.type";
import UserAvatar from "../components/UserAvatar.vue";

export default {
    components: { UserAvatar },
    computed: {
        ...mapState("profile", ["profile"]),
        registeredAt() {
            const date = new Date(this.profile.createdAt);
            const month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            return date.getDate() + "." + month + "." + date.getFullYear();
        },
    },
    mounted() {
        const userId = this.$route.params.id;
        this.$store.dispatch("profile/" + FETCH_PROFILE, userId);
    },
};
</script>

<style scoped>
.profile-name {
    width: 200px;
    font-size: 20px;
    color: #4d5255;
}

.look-img {
    max-height: 10rem;
    padding: 1rem;
    max-width: 100%;
    -webkit-transition: 0.4s all;
}

.look-img:hover {
    -webkit-filter: brightness(80%);
}

.look {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@media screen and (max-width: 575.98px) {
    .look-img {
        max-height: initial;
    }

    .look-img-container {
        width: 70%;
    }

    .look {
        flex-direction: row;
    }
}
</style>