<template>
    <form class="w-50 mx-auto" @submit.prevent="onSubmit">
        <div class="alert-danger" :key="field" v-for="(error, field) in errors">
            {{ error }}
        </div>
        <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input v-model="category.name" required class="form-control" type="text" id="name" />
        </div>
        <div class="form-group">
            <label class="form-label" for="gender">Gender</label>
            <select class="form-select" id="gender" v-model="category.gender">
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
        </div>
        <div class="form-group">
            <label for="piece-category-select" class="form-label">Parent</label>
            <PieceCategorySelect id="piece-category-select" v-model="category.parent" />
        </div>
        <button class="btn btn-outline-secondary">Send</button>
    </form>
</template>

<script>
import { ADD_CATEGORY } from "../../store/actions.type";
import PieceCategorySelect from "../PieceCategorySelect.vue";

export default {
    components: {
        PieceCategorySelect,
    },
    data() {
        return {
            category: {
                name: null,
                parent: null,
                gender: null,
            },
            errors: {},
        };
    },
    methods: {
        async onSubmit() {
            try {
                this.errors = {};
                await this.$store.dispatch("pieceCategories/" + ADD_CATEGORY, this.category);
                alert("Category has been added");
            } catch (e) {
                this.errors = e.response.data.errors;
            }
        }
    },
};
</script>

