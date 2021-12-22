<template>
  <div class="comments">
    <p class="title">Comments ({{ comments.length }})</p>
    <div class="comments-list">
      <div class="comments-list__toggle" @click="showCreateComment = !showCreateComment">
        Create Comment
        <img :class="{ icon: true, reversed: showCreateComment }"
             src="../../assets/images/Up.svg" />
      </div>
      <transition name="slide-down">
        <div class="create-comment" v-if="showCreateComment">
          <div class="form-group">
            <label class="form-group__label" for="comment-name">Name</label>
            <input class="input--text" id="comment-name" type="text" v-model="commentName" />
          </div>
          <div class="form-group">
            <label class="form-group__label" for="comment-content">Content</label>
            <textarea class="input--text full-width" id="comment-content" type="text"
                      v-model="commentContent" maxlength="500" />
          </div>
          <button class="button" @click="submit">Submit</button>
        </div>
      </transition>
      <AComment v-for="comment in comments" :key="comment._id" :comment="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Comment} from "@/interfaces/comment.interface";
import AComment from "@/components/comments/AComment.vue";
@Component({
  components: {AComment}
})
export default class Comments extends Vue {
  @Prop() articleId!: string;
  @Prop() comments!: Comment[];
  private commentName = "";
  private commentContent = "";
  private showCreateComment = true;

  /**
   * Submits a comment.
   */
  async submit() {
    if (this.commentName && this.commentContent) {
      const { OK, data, error } = await this.$api.articles.postComment(this.articleId,
          this.commentName, this.commentContent);
      if (OK) {
        this.comments.push(data);
        this.commentName = "";
        this.commentContent = "";
        this.showCreateComment = false;
      } else {
        console.log(error);
        await this.$store.dispatch('error', "An error occurred posting your comment");
      }
    }
  }
}
</script>
