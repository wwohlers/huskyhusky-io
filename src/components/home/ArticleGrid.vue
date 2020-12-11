<template>
  <div class="article-grid">
    <ArticleClip
        v-for="(article, i) in articles"
        :key="article._id"
        :first-article="i == 0"
        :article="article"/>
    <Subscribe />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Article} from "@/interfaces/Article";
import ArticleClip from "@/components/home/ArticleClip.vue";
import Subscribe from "@/components/reusable/Subscribe.vue";

@Component({
  components: {
    Subscribe,
    ArticleClip
  }
})
export default class ArticleGrid extends Vue {
  private articles: Article[] = [];

  async created() {
    this.articles = await this.loadTopArticles();
  }

  /**
   * Returns the top articles to display on the page.
   */
  async loadTopArticles(): Promise<Article[]> {
    const response = await this.$api.articles.getTopArticles(12);
    if (response.OK) return response.data;
    else {
      await this.$store.dispatch('error', "Failed to load articles");
      return [];
    }
  }
}
</script>
