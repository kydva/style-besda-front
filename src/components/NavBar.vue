<template>
  <div>

  <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3 mb-4">
    <router-link to="/" class="navbar-brand">Style Besda</router-link>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/registration">Sign up</router-link>
        </li>
      </ul>

    </div>
  </nav>

  <Slide right class="d-md-none">
    <a id="home" href="#">
      <span>Home</span>
    </a>
  </Slide>

  </div>
</template>

<script>
import {Slide} from 'vue-burger-menu'

export default {
  components: {Slide}
}
</script>

<style>
.bm-burger-button {
  top: 4rem;
  right: 1rem !important;
}
</style>