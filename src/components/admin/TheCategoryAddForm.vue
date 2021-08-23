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
            <label for="piece-category-select" class="form-label">Parent</label>
            <PieceCategorySelect id="piece-category-select" @select="onSelect" />
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
        },
        onSelect(parentNode) {
            this.category.parent = parentNode._id;
        },
    },
};
</script>

<style scoped>
.form-group {
    text-align: left;
    margin-bottom: 1rem;
}
</style>
