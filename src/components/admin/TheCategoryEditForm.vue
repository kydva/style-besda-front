<template>
    <form class="w-50 mx-auto">
        <div class="alert-danger" :key="field" v-for="(error, field) in errors">
            {{ error }}
        </div>
        <div class="form-group">
            <label for="piece-category-select" class="form-label">Category</label>
            <PieceCategorySelect id="piece-category-select" @select="onSelect" />
        </div>

        <div class="form-group">
            <label for="name" class="form-label">New name</label>
            <input v-model="category.name" class="form-control" type="text" id="name" />
        </div>

        <button class="btn btn-outline-secondary" @click.prevent="onUpdate">Update</button>
        <button class="btn btn-outline-danger" @click.prevent="onDelete">Delete category</button>
    </form>
</template>

<script>
import { REMOVE_CATEGORY, UPDATE_CATEGORY } from "../../store/actions.type";
import PieceCategorySelect from "../PieceCategorySelect.vue";

export default {
    components: {
        PieceCategorySelect,
    },

    data() {
        return {
            category: {
                name: null,
                id: null,
            },
            errors: {},
        };
    },
    methods: {
        async onUpdate() {
            if (this.category.id === null) {
                this.errors.categoryId = "Please, select the category";
            }
            try {
                this.errors = {};
                await this.$store.dispatch("pieceCategories/" + UPDATE_CATEGORY, this.category);
            } catch (e) {
                this.errors = e.response.data.errors;
            }
            alert("Category has been updated");
        },
        async onDelete() {
            if (this.category.id === null) {
                this.errors.categoryId = "Please, select the category";
            }
            try {
                this.errors = {};
                await this.$store.dispatch("pieceCategories/" + REMOVE_CATEGORY, this.category.id);
            } catch (e) {
                this.errors = e.response.data.errors;
            }
            alert("Category has been removed");
        },
        onSelect(node) {
            this.category.id = node._id;
        },
    },
};
</script>

<style scoped>
.form-group {
    text-align: left;
    margin-bottom: 1rem;
}
.btn {
    margin: 0 0.5rem 0.5rem 0.5rem;
}
</style>
