<template>
  <div id="app" class="wrapper">
    <Header />
    <div class="main">
      <Messages />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import Header from "@/components/header/TheHeader.vue";
import Footer from "@/components/footer/TheFooter.vue";
import auth from "@/auth/auth";
import Messages from "@/components/reusable/Messages.vue";

@Component({
  components: {
    Messages,
    Header,
    Footer
  }
})
export default class App extends Vue {
  async created() {
    await this.checkExistingAuth();
  }

  /**
   * Check for existing auth credentials in local storage.
   */
  async checkExistingAuth() {
    if (auth.hasCreds()) {
      // assume that the user is authenticated
      this.$store.commit('setAuthenticated', true);
      const { OK, data, error } = await this.$api.users.me();
      if (OK) {
        this.$store.commit('loginUser', data);
      } else {
        this.$store.commit('setAuthenticated', false);
        auth.removeCreds();
        await this.$router.push({ name: 'SignIn' });
      }
    }
  }
}
</script>

<style lang="scss">
@import "./styles/styles";
@import "./styles/desktop";
</style>
