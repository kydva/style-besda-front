<template>
    <div>
        <form class="w-50 mx-auto" @submit.prevent="onSubmit">
            <div v-if="loading" class="fa-2x"><i class="fas fa-spinner fa-spin"></i></div>
            <div v-if="created" class="text-success">Piece successfully deleted</div>
            <div class="alert-danger" :key="field" v-for="(error, field) in errors">
                {{ error }}
            </div>
            <div class="text-danger">Warning! All related looks will be removed</div>
            <div class="form-group">
                <label class="form-label" for="gender">Gender</label>
                <select required class="form-select" id="gender" v-model="gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div class="form-group">
                <Treeselect
                    v-model="pieceId"
                    :normalizer="normalizer"
                    :async="true"
                    :load-options="loadOptions"
                    retryText=""
                >
                    <label class="pieceselect-item" slot="option-label" slot-scope="{ node }">
                        <div>
                            <img
                                class="img-fluid me-1"
                                :src="$baseUrl + '/img/pieces/' + node.raw.img"
                            />
                            {{ node.label }}
                        </div>
                    </label>
                </Treeselect>
            </div>
            <button class="btn btn-outline-secondary">Remove</button>
        </form>
    </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import { mapState } from "vuex";
import { FETCH_PIECES, REMOVE_PIECE } from "../../store/actions.type";

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
        gender: null,
        pieceId: null,
        errors: {},
        loading: false,
        created: false,
    }),
    computed: {
        ...mapState("pieces", ["pieces"]),
    },
    methods: {
        async loadOptions({ action, searchQuery, callback }) {
            if (action == "ASYNC_SEARCH") {
                if (!this.gender) {
                    return callback("Please, choose a gender", null);
                }
                await this.$store.dispatch("pieces/" + FETCH_PIECES, {
                    searchQuery,
                    gender: this.gender,
                });
                callback(null, this.pieces);
            }
        },
        async onSubmit() {
            try {
                this.created = false;
                this.loading = true;
                await this.$store.dispatch("pieces/" + REMOVE_PIECE, this.pieceId);
                this.created = true;
            } catch (e) {
                this.errors = e.response.data.errors;
            } finally {
                this.loading = false;
            }
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
