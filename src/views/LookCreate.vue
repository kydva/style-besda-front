<template>
    <div>
        <h1 class="py-2">Create look</h1>
        <form class="w-75 mx-auto" @submit.prevent="onSubmit">
            <div class="alert-danger" :key="field" v-for="(error, field) in errors">
                {{ error }}
            </div>
            <div class="form-group">
                <label class="form-label" for="gender">Gender</label>
                <select class="form-select" id="gender" v-model="look.gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Pieces</label>
                <Treeselect
                    v-model="look.pieces"
                    :normalizer="normalizer"
                    :multiple="true"
                    :async="true"
                    :load-options="loadOptions"
                    retryText=""
                >
                    <label class="pieceselect-item" slot="option-label" slot-scope="{ node }">
                        <div>
                            <img
                                class="img-fluid me-1"
                                :src="'http://localhost:3000/img/pieces/' + node.raw.img"
                            />
                            {{ node.label }}
                        </div>
                    </label>
                </Treeselect>
            </div>
            <div class="form-group">
                <label for="image" class="form-label">Image</label>
                <input type="file" class="form-control" id="image" @change="onImgSelect" />
            </div>
            <button class="btn btn-outline-secondary">Send</button>
        </form>
    </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import { mapState } from "vuex";
import { ADD_LOOK, FETCH_PIECES } from "../store/actions.type";

export default {
    components: { Treeselect },
    data: () => ({
        normalizer(node) {
            return {
                id: node._id,
                label: node.name,
                children: 0,
            };
        },
        look: {
            pieces: [],
            gender: "",
            img: null,
        },
        errors: {},
    }),
    computed: {
        ...mapState("pieces", ["pieces"]),
    },
    methods: {
        async loadOptions({ action, searchQuery, callback }) {
            if (action == "ASYNC_SEARCH") {
                if (!this.look.gender) {
                    return callback("Please, choose a gender", null);
                }
                await this.$store.dispatch("pieces/" + FETCH_PIECES, {
                    searchQuery,
                    gender: this.look.gender,
                });
                callback(null, this.pieces);
            }
        },
        async onSubmit() {
            try {
                await this.$store.dispatch("looks/" + ADD_LOOK, this.look);
            } catch (e) {
                this.errors = e.response.data.errors;
            }
        },
        onImgSelect(event) {
            this.look.img = event.target.files[0] ?? null;
        },
    },
};
</script>

<style scoped>
.pieceselect-item img {
    width: 50px;
}

.pieceselect-item {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
