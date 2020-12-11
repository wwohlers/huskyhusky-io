<template>
  <nav :class="{ header__nav: true, 'dropdown-mobile': displayDropdownMobile }">
    <router-link to="/" @click.native="displayDropdownMobile = false">
      <img class="icon small" src="../../assets/images/paw.png" />
      Home
    </router-link>
    <router-link to="/archive" @click.native="displayDropdownMobile = false">
      <img class="icon small" src="../../assets/images/paw.png" />
      Archive
    </router-link>
    <router-link to="/about" @click.native="displayDropdownMobile = false">
      <img class="icon small" src="../../assets/images/paw.png" />
      About
    </router-link>
    <router-link
        v-if="user"
        to="/write"
        @click.native="displayDropdownMobile = false">
      <img class="icon small" src="../../assets/images/paw.png" />
      Write
    </router-link>
    <router-link
        v-if="user"
        to="/account"
        @click.native="displayDropdownMobile = false">
      <img class="icon small" src="../../assets/images/paw.png" />
      Account
    </router-link>
    <a
        v-if="user"
        @click="signOut">
      <img class="icon small" src="../../assets/images/paw.png" />
      Sign Out
    </a>
  </nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {User} from "@/interfaces/User";
import auth from "@/auth/auth";

@Component
export default class Nav extends Vue {
  @Prop() displayDropdownMobile!: boolean;

  get user(): User {
    return this.$store.getters.user;
  }

  async signOut() {
    this.displayDropdownMobile = false;
    const { OK, data, error } = await this.$api.users.signOut();
    if (OK) {
      auth.removeCreds();
      this.$store.commit('logoutUser');
      await this.$router.push({ name: 'Home' });
    } else {
      console.log(error);
      await this.$store.dispatch('error', "An error occurred logging you out: " + error);
    }
  }
}
</script>
