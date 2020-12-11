<template>
  <div class="edit" v-if="article">
    <div class="form-group">
      <label class="form-group__label" for="form-name">Name</label>
      <input
        id="form-name"
        type="text"
        class="input--text full-width"
        v-model="article.name"
      />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="form-title">Title</label>
      <input
        id="form-title"
        type="text"
        class="input--text full-width"
        v-model="article.title"
      />
    </div>
    <div class="form-group">
      <label class="form-group__label">Tags</label>
      <TagSelector
        :already-selected-tags="article.tags"
        @tags-selected="setTags"
      />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="form-brief">Brief</label>
      <textarea
        id="form-brief"
        class="input--text full-width"
        v-model="article.brief"
      />
    </div>
    <div class="form-group">
      <label class="form-group__label">Image</label>
      <img class="edit__thumb" :src="article.image" />
      <ImageUpload @uploaded="imageUploaded" />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="form-attr">Attribution</label>
      <input
        id="form-attr"
        type="text"
        class="input--text full-width"
        v-model="article.attr"
      />
    </div>
    <div class="form-group">
      <label class="form-group__label" for="form-text">Content</label>
      <textarea
        id="form-text"
        class="input--text full-width"
        rows="10"
        v-model="article.text"
      />
    </div>
    <div class="form-group">
      <label :class="{ 'form-group__label': true, black: !article.public }">
        {{ article.public ? "Public" : "Not Public" }}
      </label>
      <Toggle v-model="article.public" />
    </div>
    <div class="buttons">
      <button class="button secondary" @click="deleteArticle">Delete</button>
      <button class="button secondary" @click="cancel">Cancel</button>
      <button class="button" @click="save">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Article } from "@/interfaces/Article";
import { User } from "@/interfaces/User";
import TagSelector from "@/components/reusable/TagSelector.vue";
import ImageUpload from "@/components/reusable/ImageUpload.vue";
import Toggle from "@/components/reusable/Toggle.vue";
@Component({
  components: { Toggle, ImageUpload, TagSelector }
})
export default class EditView extends Vue {
  private article: Article | null = null;

  async created() {
    if (!this.$route.params.id) await this.$router.push({ name: "Write" });
    const article = await this.getArticle(this.$route.params.id);
    if (article) {
      if ((article.author as User)._id !== this.user._id && !this.user.admin) {
        await this.$router.push({ name: "Write" });
      } else {
        this.article = article;
        // Sets watcher after article is loaded so as to ignore first change
        this.$watch("article.title", this.matchName);
        this.$meta.setTitle("Edit " + this.article.title);
      }
    } else {
      await this.$router.push({ name: "Write" });
    }
  }

  get user(): User {
    return this.$store.getters.user;
  }

  /**
   * $sets a property of the Article, if it exists.
   */
  $setArticle(key: string, value: any) {
    if (this.article) {
      this.$set(this.article, key, value);
    }
  }

  /**
   * Gets the name of the Article based on the title.
   * @param title
   */
  matchNameToTitle(title: string): string {
    title = title.toLowerCase();
    return title.replaceAll(/[^a-z]+/g, "-");
  }

  /**
   * Sets the tags of the article.
   */
  setTags(tags: string[]) {
    this.$setArticle("tags", tags);
  }

  /**
   * When image is uploaded, sets image uri.
   */
  imageUploaded(uri: string) {
    this.$setArticle("image", uri);
  }

  /**
   * Deletes the Article after confirmation.
   */
  async deleteArticle() {
    if (!this.article) return;
    if (window.confirm("Are you sure you want to delete this article?")) {
      const { OK, error } = await this.$api.articles.deleteArticle(
        this.article._id
      );
      if (OK) {
        await this.$router.push({ name: "Write" });
      } else {
        console.log(error);
        await this.$store.dispatch(
          "error",
          "An error occurred deleting your article"
        );
      }
    }
  }

  /**
   * Cancels editing the article.
   */
  cancel() {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      )
    ) {
      this.$router.push({ name: "Write" });
    }
  }

  /**
   * Saves the Article.
   */
  async save() {
    if (!this.article) return;
    const { OK, error } = await this.$api.articles.updateArticle(this.article);
    if (OK) {
      await this.$router.push({ name: "Write" });
    } else {
      console.log(error);
      await this.$store.dispatch(
        "error",
        "An error occurred saving the changes"
      );
    }
  }

  /**
   * Gets the Article with the given id.
   * @param id
   */
  async getArticle(id: string): Promise<Article | null> {
    const { OK, data, error } = await this.$api.articles.getArticleById(id);
    if (OK) {
      return data;
    } else {
      console.log(error);
      await this.$store.dispatch(
        "error",
        "An error occurred loading the article"
      );
      return null;
    }
  }

  /**
   * Watches the Article title for changes. Watcher is set in created() hook
   * @param newTitle
   */
  matchName(newTitle: string) {
    this.$setArticle("name", this.matchNameToTitle(newTitle));
  }
}
</script>
