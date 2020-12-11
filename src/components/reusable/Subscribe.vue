<template>
  <div class="subscribe">
    <div class="form-group">
      <label class="form-group__label" for="subscribe-input">Subscribe</label>
      <input
          id="subscribe-input"
          :class="{ 'form-group__input': true, 'input--text': true, 'input--green': green }"
          type="text"
          v-model="email"
          placeholder="Email"
          @keydown.enter="submit"
      />
      <button class="button inline-block" @click="submit">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Subscribe extends Vue {
  private email = "";
  private green = false;

  async submit() {
    // TODO: validate email
    const { OK, data, error } = await this.$api.subs.subscribe(this.email);
    if (OK) {
      this.email = "";
      this.green = true;
    } else {
      await this.$store.dispatch('error', "An error occurred subscribing your email");
    }
  }
}
</script>
