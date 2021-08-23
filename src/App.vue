<template>
    <div id="app">
        <TheNavBar></TheNavBar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import { FETCH_CATEGORIES, FETCH_USER } from "./store/actions.type";

export default {
    components: { TheNavBar },
    async mounted() {
        this.$store.dispatch(FETCH_USER);
        this.$store.dispatch("pieceCategories/" + FETCH_CATEGORIES);
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
