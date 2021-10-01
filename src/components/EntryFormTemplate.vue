<template>
    <div class="container">
        <h2>Style Besda</h2>
        <span class="text-muted">Your personal fashion-stylist</span>
        <hr class="w-25 mx-auto" />
        <div class="btn-group btn-group-toggle mb-3">
            <router-link
                to="/login"
                :class="state == 'login' ? 'btn-lg active' : ''"
                class="btn btn-outline-secondary"
            >
                Sign in
            </router-link>
            <router-link
                to="/register"
                :class="state == 'register' ? 'btn-lg active' : ''"
                class="btn btn-outline-secondary"
            >
                Sign up
            </router-link>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        state: String,
    },
    mounted() {
        if (this.state !== "login" && this.state !== "register") {
            throw new Error("Undefined EntryFormTemplate state!");
        }
    },
};
</script>

<style scoped>
.container {
    padding-top: 20vh;
    min-height: 87vh;
}

.btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@media screen and (min-width: 768px) {
    form {
        width: 50%;
    }
}
</style>