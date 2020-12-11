<template>
  <div class="form-group">
    <label class="form-group__label" for="edit-bio">Bio</label>
    <textarea class="input--text full-width" id="edit-bio" v-model="bio" />
    <button class="button" @click="submit">OK</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class UpdateBio extends Vue {
  private bio = "";

  created() {
    this.bio = this.$store.getters.user.bio;
  }

  async submit() {
    const { OK, error } = await this.$api.users.setBio(this.bio);
    if (OK) {
      await this.$store.dispatch('success', "Bio updated");
      this.$store.commit('setUserProp', { key: 'bio', value: this.bio });
    } else {
      console.log(error);
    }
  }
}
</script>
