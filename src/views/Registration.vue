<template>
    <div>
        <h3>Sign up</h3>
        <form class="form-group w-50 mx-auto">
            <div class="alert-danger mb-1" v-bind:key="error.message" v-for="error in errors">
                {{ error }}
            </div>
            <input
                placeholder="Name"
                v-model="name"
                class="form-control my-2"
                type="text"
                name="name"
            />
            <input
                placeholder="Password"
                v-model="password"
                class="form-control my-2"
                name="password"
            />
            <input
                placeholder="Password confirm"
                v-model="passwordConfirm"
                class="form-control my-2"
                name="password"
            />
            <button class="btn btn-outline-secondary" @click="onSubmit">Send</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            errors: [],
            name: null,
            password: null,
            passwordConfirm: null,
        };
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();

            if (this.password !== this.passwordConfirm) {
                alert("CONFIRM PASSWORD!!!!");
            }

            try {
                await axios.post(
                    "http://localhost:3000/registration",
                    {
                        name: this.name,
                        password: this.password,
                        password_confirm: this.passwordConfirm,
                    },
                    { withCredentials: true }
                );
                window.location.href = "/";
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
</style>