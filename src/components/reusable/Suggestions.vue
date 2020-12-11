<template>
  <div class="suggestions">
    <ArticleClip
      v-for="article in suggestedArticles"
      :key="article._id"
      :article="article"
      :first-article="false" />
    <Subscribe />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Article} from "@/interfaces/Article";
import ArticleClip from "@/components/home/ArticleClip.vue";
import Subscribe from "@/components/reusable/Subscribe.vue";
@Component({
  components: {Subscribe, ArticleClip}
})
export default class Suggestions extends Vue {
  private suggestedArticles: Article[] = [];

  @Prop() tag!: string;
  @Prop() numberToShow!: number;
  @Prop() avoidId!: string;

  async created() {
    let suggestions = await this.loadSuggestions(this.tag);
    if (this.avoidId) {
      suggestions = suggestions.filter(a => a._id.toString() !== this.avoidId);
    }
    this.suggestedArticles = suggestions.slice(0, this.numberToShow);
  }

  /**
   * Loads articles with the given tag.
   * @param tag
   */
  async loadSuggestions(tag: string): Promise<Article[]> {
    const { OK, data, error } = await this.$api.articles.getArticlesByTag(tag);
    if (OK) {
      return data;
    } else {
      console.log(error);
      return [];
    }
  }
}
</script>
