<template>
  <div class="comment">
    <div class="comment__details"><strong>{{ comment.name }}</strong> {{ commentDate }}</div>
    <div class="comment__content">{{ comment.content }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Comment} from "@/interfaces/comment.interface";

@Component
export default class AComment extends Vue {
  @Prop() comment!: Comment;

  get commentDate() {
    return this.$date.unixAgo(this.comment.createdAt);
  }
}
</script>
