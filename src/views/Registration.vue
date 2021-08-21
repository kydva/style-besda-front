<template>
    <div>
        <h3>Sign up</h3>
        <form class="form-group w-50 mx-auto" @submit.prevent="onSubmit">
            <div class="alert-danger" :key="field" v-for="(error, field) in errors">
                {{ error }}
            </div>
            <input placeholder="Name" v-model="credentials.name" class="form-control" type="text" />
            <input
                placeholder="Password"
                type="password"
                v-model="credentials.password"
                class="form-control"
            />
            <input
                placeholder="Password confirmation"
                type="password"
                v-model="credentials.passwordConfirm"
                class="form-control"
            />
            <button class="btn btn-outline-secondary">Send</button>
        </form>
    </div>
</template>

<script>
import { REGISTER } from "../store/actions.type";

export default {
    data() {
        return {
            credentials: {
                name: null,
                password: null,
                passwordConfirm: null,
            },
            errors: [],
        };
    },
    methods: {
        async onSubmit() {
            if (this.credentials.password !== this.credentials.passwordConfirm) {
                this.errors = { passwordConfirm: "Password is not confirmed" };
                return;
            }

            try {
                await this.$store.dispatch(REGISTER, this.credentials);
                this.$router.back();
            } catch (e) {
                if (e.response.status === 400) {
                    this.errors = e.response.data.errors;
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
</style>