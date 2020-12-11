<template>
  <div class="sign-in">
    <div class="title big">Sign In</div>
    <div class="form-group">
      <label class="form-group__label" for="email">Email</label>
      <input
          class="input--text full-width"
          id="email"
          type="text"
          v-model="email"
          @keydown.enter="submit"
      />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="password">Password</label>
      <input
          class="input--text full-width"
          id="password"
          type="password"
          v-model="password"
          @keydown.enter="submit" />
    </div>
    <a class="small" @click="forgotPassword">Forgot Password</a>
    <br />
    <br />
    <button class="button" @click="submit">Sign In</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import auth from "@/auth/auth";

@Component
export default class SignInView extends Vue {
  private email = "";
  private password = "";

  created() {
    this.$meta.setTitle("Sign In");
    if (this.$store.getters.isAuthenticated) {
      this.$router.push({ name: "Home" });
    }
  }

  /**
   * Submit the form for login.
   */
  async submit() {
    if (this.email && this.password) {
      const { OK, data, error } = await this.$api.users.signIn(this.email, this.password);
      if (OK) {
        auth.setCreds({ token: data.token });
        await this.$store.commit('loginUser', data.user);
        await this.$router.push({ name: "Home" });
      } else {
        const responseMap = new Map([
            [401, "Incorrect password"],
            [404, "No account with that email"]
        ]);
        await this.$store.dispatch('error', responseMap.get(error as number) ||
        "An unknown error occurred");
      }
    } else {
      if (!this.email) await this.$store.dispatch('error', "Please enter an email");
      else if (!this.password) await this.$store.dispatch('error', "Please enter a password");
    }
  }

  /**
   * Request a password reset.
   */
  async forgotPassword() {
    if (this.email) {
      const { OK, data, error } = await this.$api.users.requestPasswordReset(this.email);
      if (OK) {
        await this.$store.dispatch('success', "We've sent an email to the given address");
      } else {
        const errorMsg = error === 404 ? 'No account with that email' : "An unknown error occurred";
        await this.$store.dispatch('error', errorMsg);
      }
    } else {
      await this.$store.dispatch('error', "Please enter your email");
    }
  }
}
</script>
