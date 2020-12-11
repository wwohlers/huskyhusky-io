<template>
  <div class="footer">
    <p class="footer__header">The Husky Husky</p>
    <router-link to="/">Home</router-link>
    <router-link to="/archive">Archive</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/signin">Sign In</router-link>
    <div class="footer__element">&copy; {{ year }} The Husky Husky</div>
    <a class="footer__element" href="https://billwohlers.com" target="_blank">Designed By Bill
      Wohlers</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  get year() {
    return new Date().getFullYear();
  }
}
</script>
