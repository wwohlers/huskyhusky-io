<template>
  <div>
    <div class="form-group">
      <label class="form-group__label" for="current-password">Current Password</label>
      <input
          class="input--text"
          id="current-password"
          type="password"
          v-model="currentPass" />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="new-password">New Password</label>
      <input
          class="input--text"
          id="new-password"
          type="password"
          v-model="newPass" />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="confirm-password">Confirm New Password</label>
      <input
          class="input--text"
          id="confirm-password"
          type="password"
          v-model="confirmPass"
          @keydown.enter="submit"
      />
    </div>
    <button class="button" @click="submit">OK</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ChangePassword extends Vue {
  private currentPass = "";
  private newPass = "";
  private confirmPass = "";

  /**
   * Submits password change.
   */
  async submit() {
    if (this.newPass !== this.confirmPass) {
      await this.$store.dispatch('error', "Passwords must match");
      return;
    }
    const { OK, data, error } = await this.$api.users.updatePassword(this.currentPass,
        this.newPass);
    if (OK) {
      await this.$store.dispatch('success', "Password successfully changed");
      this.currentPass = "";
      this.newPass = "";
      this.confirmPass = "";
    } else {
      console.log(error);
      const message = error === 401 ? "Incorrect password" : "An unknown error occurred";
      await this.$store.dispatch('error', message);
    }
  }
}
</script>
