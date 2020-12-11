<template>
  <div>
    <strong>{{ subs.length }} subscribers</strong>
    <div v-for="sub in subs" :key="sub">{{ sub }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Sub} from "@/interfaces/Sub";

@Component
export default class ManageSubs extends Vue {
  private subs: string[] = [];

  async created() {
    this.subs = await this.getSubs();
  }

  async getSubs(): Promise<string[]> {
    const { OK, data, error } = await this.$api.subs.getAllSubs();
    if (OK) {
      return data;
    } else {
      await this.$store.dispatch('error', "An error occurred loading subs");
      return [];
    }
  }
}
</script>
