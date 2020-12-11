<template>
  <div>
    <Section name="Create User">
      <div class="form-group">
        <label class="form-group__label" for="user-name">Name</label>
        <input class="input--text" type="text" id="user-name" v-model="newUserName" />
      </div>
      <div class="form-group">
        <label class="form-group__label" for="user-email">Email</label>
        <input class="input--text" type="text" id="user-email" v-model="newUserEmail" />
      </div>
      <div class="form-group">
        <label class="form-group__label" for="user-password">Password</label>
        <input class="input--text" type="text" id="user-password" v-model="newUserPassword" />
      </div>
      <button @click="createUser" class="button">Create User</button>
    </Section>
    <table>
      <tr>
        <th>Username</th>
        <th>Admin</th>
        <th>Removed</th>
      </tr>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.name }}</td>
        <td>
          <Toggle :value="user.admin" @input="adminToggleHandler(user, $event)" />
        </td>
        <td>
          <Toggle :value="user.removed" @input="removedToggleHandler(user, $event)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {User} from "@/interfaces/User";
import Toggle from "@/components/reusable/Toggle.vue";
import Section from "@/components/reusable/Section.vue";
@Component({
  components: {Section, Toggle}
})
export default class ManageUsers extends Vue {
  private users: User[] = [];
  private newUserName = "";
  private newUserEmail = "";
  private newUserPassword = "";

  async created() {
    this.users = await this.getUsers();
  }

  /**
   * Returns a function that handles Admin toggling for a given user.
   * @param user
   */
  async adminToggleHandler(user: User, value: boolean) {
    const { OK, data, error } = await this.$api.users.setAdmin(user._id, value);
    if (OK) {
      this.$set(user, 'admin', value);
    } else {
      await this.$store.dispatch('error', "An error occurred granting admin privileges");
    }
  }

  /**
   * Returns a function that handles Removed toggling for a given user.
   * @param user
   */
  async removedToggleHandler(user: User, value: boolean) {
    const { OK, data, error } = await this.$api.users.setRemoved(user._id, value);
    if (OK) {
      this.$set(user, 'removed', value);
    } else {
      await this.$store.dispatch('error', "An error occurred removing the user");
    }
  }

  /**
   * Create a user.
   */
  async createUser() {
    const { OK, data, error } = await this.$api.users.createUser(this.newUserName, this.newUserEmail,
        this.newUserPassword);
    if (OK) {
      this.users.push(data);
      await this.$store.dispatch('success', "Successfully created user");
      this.newUserName = "";
      this.newUserEmail = "";
      this.newUserPassword = "";
    } else {
      await this.$store.dispatch('error', "An error occurred creating the user");
    }
  }

  /**
   * Gets list of all users.
   */
  async getUsers(): Promise<User[]> {
    const { OK, data, error } = await this.$api.users.getAllUsers();
    if (OK) {
      return data;
    } else {
      console.log(error);
      await this.$store.dispatch('error', "An error occurred loading users");
      return [];
    }
  }
}
</script>
