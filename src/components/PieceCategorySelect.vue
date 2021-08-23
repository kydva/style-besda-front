<template>
    <Treeselect @select="onSelect" :options="categories" :value="value" :normalizer="normalizer" />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapState } from "vuex";

export default {
    components: { Treeselect },
    data: () => ({
        value: null,
        normalizer(node) {
            return {
                id: node._id,
                label: node.name,
                children: node.children && node.children.length ? node.children : 0,
            };
        },
    }),
    methods: {
        onSelect(id) {
            this.$emit("select", id);
        },
    },
    computed: {
        ...mapState("pieceCategories", ["categories"]),
    },
};
</script>