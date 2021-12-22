<template>
  <div class="about">
    <h1>About The Husky Husky</h1>
    <p>
    We are a small online satire magazine run by Northeastern students. Please don't leave.
    </p>
    <p>
      Got an idea? <a href="mailto:thehuskyhusky@gmail.com">Email us.</a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AboutView extends Vue {
  created() {
    this.$meta.setTitle("About");
  }
}
</script>
