<template>
    <EntryFormTemplate state="register">
        <form class="form-group w-50 mx-auto" @submit.prevent="onSubmit">
            <div class="alert-danger" :key="field" v-for="(error, field) in errors">
                {{ error }}
            </div>
            <input placeholder="Name" v-model="user.name" class="form-control" type="text" />

            <select class="form-select" id="gender" v-model="user.gender">
                <option disabled selected hidden :value="null">Choose gender...</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>

            <input
                placeholder="Password"
                type="password"
                v-model="user.password"
                class="form-control"
            />
            <input
                placeholder="Password confirmation"
                type="password"
                v-model="user.passwordConfirm"
                class="form-control"
            />
            <button class="btn btn-outline-secondary mx-auto">Send</button>
        </form>
    </EntryFormTemplate>
</template>

<script>
import EntryFormTemplate from "../components/EntryFormTemplate.vue";
import { REGISTER } from "../store/actions.type";

export default {
    components: { EntryFormTemplate },
    data() {
        return {
            user: {
                name: null,
                gender: null,
                password: null,
                passwordConfirm: null,
            },
            errors: [],
        };
    },
    methods: {
        async onSubmit() {
            if (this.user.password !== this.user.passwordConfirm) {
                this.errors = { passwordConfirm: "Password is not confirmed" };
                return;
            }

            try {
                await this.$store.dispatch(REGISTER, this.user);
                this.$router.push("/wardrobe");
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