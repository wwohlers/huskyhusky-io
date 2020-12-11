<template>
  <div>
    <Selector :options="allOtherTags" :default-value="'Select tags'" @input="addTag" />
    <div class="tag-list">
      <div
          class="tag-list__item"
          v-for="tag in selectedTags"
          :key="tag"
          @click="removeTag(tag)"
      >
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Selector from "@/components/reusable/Selector.vue";
@Component({
  components: {Selector}
})
export default class TagSelector extends Vue {
  private allTags: string[] = [];
  private selectedTags: string[] = [];

  @Prop() alreadySelectedTags!: string[];

  async created() {
    this.allTags = await this.getTags();
    if (this.alreadySelectedTags) {
      this.selectedTags = this.alreadySelectedTags;
    }
  }

  /**
   * Get all tags that are not selected.
   */
  get allOtherTags(): string[] {
    return this.allTags.filter(t => !this.selectedTags.includes(t));
  }

  emitTags() {
    this.$emit('tags-selected', this.selectedTags);
  }

  addTag(tag: string) {
    this.selectedTags.push(tag);
    this.emitTags();
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
    this.emitTags();
  }

  /**
   * Gets all available tags.
   */
  async getTags(): Promise<string[]> {
    const { OK, data, error } = await this.$api.articles.getAllTags();
    if (OK) {
      return data;
    } else {
      console.log(error);
      await this.$store.dispatch('error', "An error occurred trying to load tags");
      return [];
    }
  }
}
</script>
