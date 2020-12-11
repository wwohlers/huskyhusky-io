<template>
  <div class="about">
    <h1>About The Husky Husky</h1>
    <p>
    We are a small online satire magazine run by Northeastern students. Please don't leave.
    </p>
    <p>
    How can we best describe ourselves? Well, let's see. You know the mayonnaise they serve in the dining halls? You know how it just sits there under the heat lamps all day and by the time you take some and put it on your plate it doesn't really taste or act like mayonnaise anymore? That is us. The Husky Husky!! We're not what you expected when you tried us and it really wasn't worth it in the first place.
    </p>
    <p>
    Our writing is generally absurdist and satirical, but anything that makes us laugh will get published. Generally, we try to find humor in local school issues. Northeastern takes itself too seriously - and there's a lot of good comedy that springs up from that simple fact.
    </p>
    <div class="button-panel">
      <a class="button-panel__button"
         href="https://www.patreon.com/user?u=34790035&fan_landing=true" target="_blank">
        <img src="../assets/images/patreon.png" />
        <br />
        Patreon
      </a>
      <a class="button-panel__button" href="https://docs.google.com/forms/d/1-BNGDS9ixzgqtM4XVMzrXhsAvYs6CjNZMTwUnf6iFVE/edit#response=ACYDBNiKRCvHHKAGrMH32_IMd9PR9hOqDvUdn6sCuHzeNNPOije9bnexbE4nGEDQaDlgle0"
      target="_blank">
        <img src="../assets/images/write.png" />
        <br />
        Write for us
      </a>
      <a class="button-panel__button">
        <img src="../assets/images/idea.png" />
        <br />
        Got an idea?
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AboutView extends Vue {
  created() {
    this.$meta.setTitle("About");
  }
}
</script>
