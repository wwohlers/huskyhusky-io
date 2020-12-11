<template>
  <div class="file-upload">
    <label class="file-upload__label" for="file-upload">
      <img class="icon" src="../../assets/images/Image.svg" />
      {{ text }}
    </label>
    <input id="file-upload" class="file-upload__input" type="file" @change="onFileChanged">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ImageUpload extends Vue {
  private loading = false;

  get text() {
    return this.loading ? 'Uploading...' : 'Upload Image';
  }

  async onFileChanged(event: any) {
    this.loading = true;
    const formData = new FormData();
    formData.append('upload', event.target.files[0]);
    const { OK, data, error } = await this.$api.articles.uploadImage(formData);
    this.loading = false;
    if (OK) {
      this.$emit('uploaded', data);
    } else {
      await this.$store.dispatch('error', "An error occurred uploading your file");
    }
  }
}
</script>
