<template>
    <Treeselect
        v-model="val"
        :options="categories"
        :normalizer="normalizer"
        :multiple="multiple"
        :always-open="alwaysOpen"
    />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapState } from "vuex";

export default {
    components: { Treeselect },
    props: {
        value: [Array, String],
        multiple: Boolean,
        alwaysOpen: Boolean,
    },
    data: () => ({
        normalizer(node) {
            return {
                id: node._id,
                label: node.name,
                children: node.children && node.children.length ? node.children : 0,
            };
        },
    }),
    computed: {
        ...mapState("pieceCategories", ["categories"]),
        val: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
};
</script>