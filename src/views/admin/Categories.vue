<template>
    <div>
        <h3>Add category</h3>
        <TheCategoryAddForm />
        <hr class="my-5" />
        <h3>Edit category</h3>
        <TheCategoryEditForm />
    </div>
</template>

<script>
import TheCategoryAddForm from "../../components/admin/TheCategoryAddForm.vue";
import TheCategoryEditForm from "../../components/admin/TheCategoryEditForm.vue";

export default {
    components: {
        TheCategoryAddForm,
        TheCategoryEditForm,
    },
};
</script>
