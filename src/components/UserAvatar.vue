<template>
    <div v-if="min" class="avatar-min" :style="avatarStyle"></div>
    <div v-else class="avatar">
        <img :src="avatarUrl" class="img-fluid rounded" />
    </div>
</template>

<script>
export default {
    props: {
        user: Object,
        min: Boolean,
    },
    computed: {
        defaultAvatar() {
            return this.user.gender === "M" ? "/img/user-male.png" : "/img/user-female.png";
        },
        avatarUrl() {
            return this.user.avatar
                ? process.env.VUE_APP_BACKEND_URL + "/img/users/" + this.user.avatar
                : this.defaultAvatar;
        },
        avatarStyle() {
            return {
                backgroundImage: "url(" + this.avatarUrl + ")",
            };
        },
    },
};
</script>

<style scoped>
.avatar-min {
    margin-left: 1.5rem;
    width: 40px;
    height: 40px;
    background-size: cover;
    background-position: top center;
    border-radius: 50%;
}

.avatar {
    max-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>