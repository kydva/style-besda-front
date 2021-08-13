<template>
    <div>
        <h3>Sign in</h3>
        <form class="form-group w-50 mx-auto">
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
            <button class="btn btn-outline-secondary" @click="onSubmit">Send</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            name: null,
            password: null,
        };
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();

            try {
                await axios.post(
                    "http://localhost:3000/login",
                    {
                        name: this.name,
                        password: this.password,
                    },
                    { withCredentials: true }
                );
                window.location.href = "/";
            } catch (e) {
                alert(e.response.status);
            }
        },
    },
};
</script>

<style scoped>
</style>