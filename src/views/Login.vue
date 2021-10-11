<template>
    <EntryFormTemplate state="login">
        <form class="mx-auto" @submit.prevent="onSubmit">
            <div v-if="error" class="alert-danger">{{ error }}</div>
            <input
                placeholder="Name"
                v-model="credentials.name"
                class="form-control"
                type="text"
                name="name"
            />
            <input
                placeholder="Password"
                v-model="credentials.password"
                class="form-control"
                type="password"
                name="password"
            />
                <button class="btn btn-outline-secondary mx-auto">Send</button>
        </form>
    </EntryFormTemplate>
</template>

<script>
import EntryFormTemplate from "../components/EntryFormTemplate.vue";
import { LOGIN } from "../store/actions.type";

export default {
    components: { EntryFormTemplate },
    data() {
        return {
            credentials: {
                name: null,
                password: null,
            },
            error: null,
        };
    },
    methods: {
        async onSubmit() {
            try {
                this.error = null;
                await this.$store.dispatch(LOGIN, this.credentials);
                this.$router.push("/wardrobe");
            } catch (e) {
                if (e.response.status === 401) {
                    this.error = "Invalid username or password. Please, try again.";
                }
            }
        },
    },
};
</script>

<style scoped>
.form-control {
    margin: 1rem 0 1rem 0;
}

.container {
    padding-top: 20vh;
}

@media screen and (min-width: 768px) {
    form {
        width: 50%;
    }
}
</style>