<template>
  <div class="about">
    <h1>About The Husky Husky</h1>
    <p>
    We are a small online satire magazine run by Northeastern students. Please don't leave.
    </p>
    <h2>Interested in writing for us?</h2>
    <p>
      Use <a href="https://forms.gle/P421oUSvQXwJcik49">this</a> form to apply.
    </p>
    <h2>Got an idea?</h2>
    <p>
      Got an idea? <a href="mailto:huskyhuskymail@gmail.com">Email us.</a>
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
