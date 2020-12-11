<template>
  <div class="archive-list">
    <div
        class="archive-item"
        v-for="article in filteredAndSortedArticles.slice(0, numberToDisplay)"
        :key="article._id"
        @click="visitArticle(article)"
    >
      <router-link :to="`/article/${article.name}`">
        <img class="archive-item__thumb" :src="article.image" />
        <div class="archive-item__details">
          <div class="archive-item__details__title">{{ article.title }}</div>
          <div class="archive-item__details__info">
            {{ $date.unixToReadable(article.createdAt) }} &bull; {{ article.author.name }}
          </div>
          <p class="archive-item__details__brief">{{ article.brief }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Article} from "@/interfaces/Article";
import ArchiveFilterInterface from "@/interfaces/archive-filter.interface";
import {User} from "@/interfaces/User";

@Component
export default class ArchiveList extends Vue {
  private numberToDisplay = 10;

  @Prop() articles!: Article[];
  @Prop() filter!: ArchiveFilterInterface;
  @Prop() editMode!: boolean;

  created() {
    window.addEventListener('scroll', this.handleScroll);
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * List of sorted articles.
   */
  get sortedArticles(): Article[] {
    if (!this.articles) return [];
    else {
      return this.articles.sort((a, b) => b.createdAt - a.createdAt);
    }
  }

  /**
   * List of articles that is both sorted and filtered.
   */
  get filteredAndSortedArticles(): Article[] {
    let articles = this.sortedArticles;
    if (!this.filter) return articles;
    if (this.filter.dateRange) {
      const { lowerBound, upperBound } = this.filter.dateRange;
      articles = articles.filter(a => {
        return (!lowerBound || a.createdAt >= lowerBound) && (!upperBound || a.createdAt <=
            upperBound);
      });
    }
    if (this.filter.author) {
      articles = articles.filter(a => (a.author as User).name === this.filter.author);
    }
    if (this.filter.tags) {
      articles = articles.filter(a => this.filter.tags.every(t => a.tags.includes(t)));
    }
    return articles;
  }

  /**
   * Visits the given Article.
   */
  visitArticle(article: Article) {
    if (this.editMode) {
      this.$router.push({ name: 'Edit', params: { id: article._id.toString() }});
    } else {
      this.$router.push({ name: 'Article', params: { name: article.name }});
    }
  }

  /**
   * Handles the scroll event. When scrolling reaches the last article, displays more.
   * @param event
   */
  handleScroll(event: Event) {
    const lastArticle = document.querySelectorAll(".archive-item:last-child")[0];
    const threshold = lastArticle.getBoundingClientRect().top;
    if (threshold < window.innerHeight) {
      this.numberToDisplay += 10;
    }
  }
}
</script>
