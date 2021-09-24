<template>
    <div>
        <form class="w-50 mx-auto" @submit.prevent="onSubmit">
            <div class="alert-danger" :key="field" v-for="(error, field) in errors">
                {{ error }}
            </div>
            <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input v-model="piece.name" required class="form-control" type="text" id="name" />
            </div>
            <div class="form-group">
                <label for="category-select" class="form-label">Category</label>
                <PieceCategorySelect id="category-select" v-model="piece.category" />
            </div>

            <div class="form-group">
                <label class="form-label" for="gender">Gender</label>
                <select class="form-select" id="gender" v-model="piece.gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" class="form-control" id="image" @change="onImgSelect" />
            </div>

            <button class="btn btn-outline-secondary">Send</button>
        </form>
    </div>
</template>

<script>
import { ADD_PIECE } from "../../store/actions.type";
import PieceCategorySelect from "../../components/PieceCategorySelect.vue";

export default {
    components: { PieceCategorySelect },
    data() {
        return {
            piece: {
                name: null,
                gender: null,
                img: null,
            },
            errors: {},
        };
    },
    methods: {
        async onSubmit() {
            try {
                this.errors = {};
                await this.$store.dispatch("pieces/" + ADD_PIECE, this.piece);
                alert("Piece has been added");
            } catch (e) {
                this.errors = e.response.data.errors;
            }
        },
        onImgSelect(event) {
            this.piece.img = event.target.files[0] ?? null;
        },

    },
};
</script>

