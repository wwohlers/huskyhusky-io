<template>
  <div class="header">
    <Logo @click.native="displayDropdownMobile = !displayDropdownMobile" />
    <Nav :display-dropdown-mobile="displayDropdownMobile" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "@/components/header/TheLogo.vue";
import Nav from "@/components/header/TheNav.vue";

@Component({
  components: {
    Logo,
    Nav
  }
})
export default class Header extends Vue {
  private displayDropdownMobile = false;
}
</script>
