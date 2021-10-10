<template>
    <div class="container">
        <div class="h3">
            <router-link to="/admin/categories/create">Add category</router-link>
            /
            <router-link to="/admin/categories/edit">Edit category</router-link>
        </div>
        <form class="w-50 mx-auto">
            <div class="alert-danger" :key="field" v-for="(error, field) in errors">
                {{ error }}
            </div>
            <div class="form-group">
                <label class="form-label" for="gender">Gender</label>
                <select class="form-select" id="gender" v-model="category.gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="piece-category-select" class="form-label">Category</label>
                <PieceCategorySelect :disabled="!category.gender" id="piece-category-select" v-model="category.id" />
            </div>
            <div class="form-group">
                <label for="name" class="form-label">New name</label>
                <input v-model="category.name" class="form-control" type="text" id="name" />
            </div>

            <button class="btn btn-outline-secondary" @click.prevent="onUpdate">Update</button>
            <button class="btn btn-outline-danger" @click.prevent="onDelete">
                Delete category
            </button>
        </form>
    </div>
</template>

<script>
import { FETCH_CATEGORIES, REMOVE_CATEGORY, UPDATE_CATEGORY } from "../../store/actions.type";
import PieceCategorySelect from "../../components/PieceCategorySelect.vue";

export default {
    components: {
        PieceCategorySelect,
    },

    data() {
        return {
            category: {
                gender: null,
                name: null,
                id: null,
            },
            errors: {},
        };
    },
    watch: {
        ["category.gender"](val) {
            this.$store.dispatch("pieceCategories/" + FETCH_CATEGORIES, { gender: val });
            this.category._id = null;
        },
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
    },
};
</script>

<style scoped>
.btn {
    margin: 0 0.5rem 0.5rem 0.5rem;
}

a {
    text-decoration: none;
    color: #5c6063;
}

a:hover {
    color: black;
}
</style>

