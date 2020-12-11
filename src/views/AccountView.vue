<template>
  <div v-if="user">
    <Section name="Change Password">
      <ChangePassword />
    </Section>
    <Section name="Update Bio">
      <UpdateBio />
    </Section>
    <div v-if="user.admin">
      <Section name="Manage Users">
        <ManageUsers />
      </Section>
      <Section name="Subs">
        <ManageSubs />
      </Section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChangePassword from "@/components/account/ChangePassword.vue";
import UpdateBio from "@/components/account/UpdateBio.vue";
import ManageUsers from "@/components/account/ManageUsers.vue";
import ManageSubs from "@/components/account/ManageSubs.vue";
import Section from "@/components/reusable/Section.vue";
@Component({
  components: {Section, ManageSubs, ManageUsers, UpdateBio, ChangePassword}
})
export default class AccountView extends Vue {
  created() {
    this.$meta.setTitle("Account");
  }

  get user() {
    return this.$store.getters.user;
  }
}
</script>
