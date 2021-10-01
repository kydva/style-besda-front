<template>
    <div id="app">
        <TheNavBar></TheNavBar>

        <transition mode="out-in" name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import { FETCH_CATEGORIES, FETCH_USER } from "./store/actions.type";

export default {
    components: { TheNavBar },
    async mounted() {
        document.title = "Style Besda";
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
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    -webkit-animation: fadeIn 0.4s;
    animation: fadeIn 0.4s;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
