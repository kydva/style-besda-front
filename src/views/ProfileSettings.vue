<template>
    <div class="container">
        <div v-if="updated" class="text-success">Data successfully updated</div>
        <div class="my-5">
            <h3>Name</h3>
            <hr />

            <form @submit.prevent="submitForm(['name'])">
                <div class="form-group">
                    <label class="form-label" for="name">Your name</label>
                    <input
                        type="text"
                        id="name"
                        :class="{ 'is-invalid': errors.name, 'form-control': true }"
                        v-model="name"
                        :placeholder="user.name"
                    />
                    <div class="text-danger small" v-if="errors.name">{{ errors.name }}</div>
                </div>

                <button class="btn btn-outline-secondary">Change name</button>
            </form>
        </div>
        <div class="my-5">
            <h3>Avatar</h3>
            <hr />
            <form @submit.prevent="submitForm(['avatar'])">
                <div class="mb-3 d-flex flex-wrap flex-sm-nowrap">
                    <UserAvatar :user="user" />
                    <UserAvatar :user="user" :min="true" class="min-avatar" />
                </div>
                <div class="form-group">
                    <input
                        type="file"
                        :class="{ 'is-invalid': errors.img, 'form-control': true }"
                        @change="onAvatarSelect"
                    />
                    <div v-if="errors.img" class="text-danger small">{{ errors.img }}</div>
                </div>
                <button class="btn btn-outline-secondary">Change avatar</button>
            </form>
        </div>
        <div class="my-5">
            <h3>Password</h3>
            <hr />
            <form @submit.prevent="submitForm(['oldPassword', 'password', 'passwordConfirm'])">
                <div class="form-group">
                    <label class="form-label" for="old-password">Old password</label>
                    <input
                        type="password"
                        id="old-password"
                        :class="{ 'is-invalid': errors.oldPassword, 'form-control': true }"
                        v-model="oldPassword"
                    />
                    <div v-if="errors.oldPassword" class="text-danger small">
                        {{ errors.oldPassword }}
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label" for="password">New password</label>
                    <input
                        type="password"
                        id="password"
                        :class="{ 'is-invalid': errors.password, 'form-control': true }"
                        v-model="password"
                    />
                    <div v-if="errors.password" class="text-danger small">
                        {{ errors.password }}
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label" for="passwordConfirm">Password confirmation</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        :class="{ 'is-invalid': errors.passwordConfirm, 'form-control': true }"
                        v-model="passwordConfirm"
                    />
                    <div v-if="errors.passwordConfirm" class="text-danger small">
                        {{ errors.passwordConfirm }}
                    </div>
                </div>
                <button class="btn btn-outline-secondary">Change password</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "../components/UserAvatar.vue";
import { UPDATE_USER } from "../store/actions.type";
export default {
    components: { UserAvatar },
    data() {
        return {
            avatar: null,
            name: null,
            oldPassword: null,
            password: null,
            passwordConfirm: null,
            loading: false,
            updated: false,
            errors: {},
        };
    },
    computed: {
        ...mapGetters(["user"]),
    },
    methods: {
        async submitForm(fields) {
            try {
                this.errors = {};
                this.updated = false;
                const payload = {};
                fields.forEach((field) => {
                    payload[field] = this[field];
                });
                await this.$store.dispatch(UPDATE_USER, payload);
                this.updated = true;
                this.password = this.oldPassword = this.passwordConfirm = this.name = null;
            } catch (e) {
                this.errors = e.response.data.errors ?? {};
            } finally {
                this.loading = false;
            }
        },
        onAvatarSelect(event) {
            this.avatar = event.target.files[0] ?? null;
        },
    },
};
</script>


<style scoped>
.container {
    text-align: left;
}

.min-avatar {
    margin: 80px;
}

@media screen and (min-width: 1200px) {
    form,
    hr {
        width: 50%;
    }
}
</style>
