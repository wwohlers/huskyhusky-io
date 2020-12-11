<template>
  <div>
    <button class="button full-width" @click="createArticle">+ New Article</button>
    <ArchiveList :articles="articles" :edit-mode="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArchiveList from "@/components/archive/ArchiveList.vue";
import {Article} from "@/interfaces/Article";
import {User} from "@/interfaces/User";
@Component({
  components: {ArchiveList}
})
export default class WriteView extends Vue {
  private articles: Article[] = [];

  async created() {
    this.$meta.setTitle("Write");
    const articles = await this.getArticles();
    // Sort by publicity first, then newest to oldest
    this.articles = articles.sort((a, b) => {
      if (a.public && !b.public) return -1;
      if (b.public && !a.public) return 1;
      return b.createdAt - a.createdAt;
    });
  }

  /**
   * Creates a new article, and navigates to it.
   */
  async createArticle() {
    const { OK, data, error } = await this.$api.articles.createArticle();
    if (OK) {
      await this.$router.push({ name: 'Edit', params: { id: data._id }});
    } else {
      await this.$store.dispatch('error', "An error occurred creating an article");
    }
  }

  /**
   * Get all Articles that are editable by this user.
   */
  async getArticles(): Promise<Article[]> {
    const { OK, data, error } = await this.$api.articles.getArticles(false);
    if (OK) {
      if (this.$store.getters.user.admin) return data;
      return data.filter(a => (a.author as User)._id.toString() ===
          this.$store.getters.user._id.toString());
    } else {
      console.log(error)
      await this.$store.dispatch('error', "An error occurred loading articles");
      return [];
    }
  }
}
</script>
