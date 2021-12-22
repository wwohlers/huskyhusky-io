<template>
  <div>
    <div v-if="!loading && !article">
      <h1>Oops!</h1>
      <p>We looked everywhere, but we couldn't find the article you're looking for.</p>
    </div>
    <div v-if="!loading && article" class="article">
      <h1 class="article__title">{{ article.title }}</h1>
      <p class="article__date">Published {{ $date.unixToReadable(article.createdAt) }}</p>
      <span
        class="article__tag"
        v-for="(tag, i) in article.tags"
        :key="i"
        @click="visitTag(tag)"
      >{{ i > 0 ? '&bull;' : ''}} {{ tag }}</span>
      <span
          class="article__tag"
          @click="visitAuthor(article.author.name)">
        &bull; By {{ article.author.name }}</span>
      <img class="article__thumb" :src="article.image" />
      <p class="article__attr">{{ article.attr }}</p>
      <div class="article__content">
        <div class="article__content__text" v-html="$html.renderHtml(article.text)" />
        <Comments :comments="article.comments" :article-id="article._id" />
        <br />
        <br />
        <Suggestions :tag="randomTag" :number-to-show="5" :avoid-id="article._id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {Article} from "@/interfaces/Article";
import Suggestions from "@/components/reusable/Suggestions.vue";
import Comments from "@/components/comments/Comments.vue";
@Component({
  components: {Comments, Suggestions}
})
export default class ArticleView extends Vue {
  private article: Article | null = null;
  private loading = true;

  async created() {
    const name = this.$route.params.name;
    this.article = await this.loadArticle(name);
    this.loading = false;
    if (this.article) {
      this.$meta.setTitle(this.article.title);
      this.$meta.setDesc(this.article.brief);
      this.$meta.setOgImage(this.article.image);
    } else {
      this.$meta.setTitle("Not Found");
    }
  }

  /**
   * Gets a random tag, preferring tags that are not Northeastern or Satire.
   */
  get randomTag() {
    if (!this.article) return "Northeastern";
    const interestingTags = this.article.tags.filter(t => t !== "Northeastern" && t !== "Satire");
    const randomEl = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    if (interestingTags.length > 0) {
      return randomEl(interestingTags);
    } else {
      return randomEl(this.article.tags);
    }
  }

  /**
   * Loads an article by its name.
   * @param name name of the article (NOT title)
   */
  async loadArticle(name: string): Promise<Article | null> {
    window.scrollTo(0, 0);
    const { OK, data, error } = await this.$api.articles.getArticleByName(name);
    if (OK) {
      this.$api.articles.clickArticle(data._id).then();
      return data;
    } else {
      console.log(error);
      await this.$store.dispatch('error', "An error occurred loading the article");
      return null;
    }
  }

  /**
   * Visits an Author's archive.
   * @param name name of the author
   */
  visitAuthor(name: string) {
    this.$router.push({ name: 'Archive', params: { author: name }});
  }

  /**
   * Visits a Tag.
   * @param name name of the tag
   */
  visitTag(name: string) {
    this.$router.push({ name: 'Archive', params: { tag: name }});
  }

  @Watch('$route.params.name')
  async watchName(newName: string) {
    this.loading = true;
    this.article = await this.loadArticle(this.$route.params.name);
    this.loading = false;
  }
}
</script>
