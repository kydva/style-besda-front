<template>
    <div>
        <h3>Add category</h3>
        <addCategory/>
        <hr class="my-5" />
        <h3>Edit category</h3>
        <editCategory/>
    </div>
</template>

<script>
import AddCategory from "../../components/admin/TheCategoryAddForm.vue";
import EditCategory from "../../components/admin/TheCategoryEditForm.vue";

export default {
    components: {
        AddCategory,
        EditCategory,
    }
};
</script>
