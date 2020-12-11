<template>
  <div :class="{ 'article-clip': true, 'first-article': firstArticle }">
    <span class="article-clip__tag" v-if="tagToDisplay" @click="visitTag(tagToDisplay)">
      {{ tagToDisplay }}
    </span>
    <router-link :to="`/article/${article.name}`">
      <img class="article-clip__thumb" :src="article.image" @click="visitArticle">
      <span class="article-clip__title" @click="visitArticle">{{ article.title }}</span>
      <p class="article-clip__brief" @click="visitArticle">
        {{ article.author.name }}
        &mdash;
        {{ article.brief }}
      </p>
    </router-link>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Article} from "@/interfaces/Article";

@Component
export default class ArticleClip extends Vue {
  @Prop() article!: Article;
  @Prop() firstArticle!: boolean;

  /**
   * Returns a single tag, of all the article's tags, to display.
   */
  get tagToDisplay(): null | string {
    if (this.article.tags.length == 0) return null;
    else {
      const tags = this.article.tags.filter(t => t !== "Northeastern" && t);
      const randomIndex = Math.floor(Math.random() * tags.length);
      return tags[randomIndex];
    }
  }

  /**
   * Visits this Article.
   */
  visitArticle() {
    this.$router.push({ name: 'Article', params: { name: this.article.name }});
  }

  /**
   * Goes to the Archive, viewing only articles with this tag.
   * @param tag
   */
  visitTag(tag: string) {
    this.$router.push({ name: 'Archive', params: { tag }});
  }
}
</script>
