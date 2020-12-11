<template>
  <div>
    <input class="input--text full-width" v-model="searchQuery" placeholder="Search archive" />
    <ArchiveFilter @filter="setFilter" />
    <ArchiveList :articles="searchedArticles" :filter="filter" />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import ArchiveFilter from "@/components/archive/ArchiveFilter.vue";
import ArchiveList from "@/components/archive/ArchiveList.vue";
import {Article} from "@/interfaces/Article";
import Fuse from "fuse.js";
import ArchiveFilterInterface from "@/interfaces/archive-filter.interface";

@Component({
  components: {ArchiveList, ArchiveFilter}
})
export default class ArchiveView extends Vue {
  private allArticles: Article[] = [];
  private searchedArticles: Article[] = [];
  private debounceTimeout: any;
  private filter: ArchiveFilterInterface = {
    dateRange: {
      lowerBound: 0,
      upperBound: 0, // no upper bound
    },
    tags: [],
    author: null
  }
  private searchQuery = "";

  async created() {
    this.$meta.setTitle("Archive");
    this.allArticles = await this.getAllArticles();
    this.searchedArticles = this.allArticles;
    if (this.$route.params) {
      this.processParams(this.$route.params);
    }
  }

  /**
   * Sets the filter according to route params.
   */
  processParams(params: any) {
    if (params.tag) {
      this.$set(this.filter, 'tags', [params.tag]);
    }
    if (params.author) {
      this.$set(this.filter, 'author', params.author);
    }
  }

  /**
   * Sets the filter.
   */
  setFilter(filter: ArchiveFilterInterface) {
    this.filter = filter;
  }

  /**
   * Debounce the search. If the query is the same after some time, then set it to the actual query.
   */
  async debounceSearch() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    const oldQuery = this.searchQuery;
    this.debounceTimeout = setTimeout(async () => {
      if (this.searchQuery === oldQuery) {
        this.searchedArticles = await this.searchArticles(this.allArticles, this.searchQuery);
      }
    }, 500);
  }

  /**
   * Search articles.
   */
  async searchArticles(articles: Article[], query: string): Promise<Article[]> {
    if (!query) return articles;
    const fuse = new Fuse(articles, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'name', weight: 0.3 },
        { name: 'brief', weight: 0.2 },
        { name: 'attr', weight: 0.1 }
      ]
    });
    return fuse.search(query).map(el => el.item);
  }

  /**
   * Get all public articles.
   */
  async getAllArticles(): Promise<Article[]> {
    const { OK, data, error } = await this.$api.articles.getArticles(true);
    if (OK) {
      return data;
    } else {
      console.log(error);
      await this.$store.dispatch('error', "An error occurred loading articles");
      return [];
    }
  }

  @Watch('searchQuery')
  async watchQuery() {
    await this.debounceSearch();
  }
}
</script>
