<template>
    <div>
        <h3>Add piece</h3>
        <ThePieceAddForm />
        <h3 class="mt-4">Remove piece</h3>
        <ThePieceRemoveForm />
    </div>
</template>

<script>
import ThePieceAddForm from "../../components/admin/ThePieceAddForm.vue";
import ThePieceRemoveForm from "../../components/admin/ThePieceRemoveForm.vue";

export default {
    components: { ThePieceAddForm, ThePieceRemoveForm },
};
</script>

