<template>
  <div class="home">
    <ArticleGrid />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleGrid from "@/components/home/ArticleGrid.vue";

@Component({
  components: {
    ArticleGrid
  }
})
export default class HomeView extends Vue {
  created() {
    this.$meta.setTitle("Home");
  }
}
</script>
