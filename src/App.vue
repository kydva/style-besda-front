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

.form-group {
    text-align: left;
    margin-bottom: 1rem;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    text-align: left;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 250px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
