<template>
  <div :class="{ toggle: true, 'toggle--on': internalValue }" @click="toggle">
    <div class="toggle__circle" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Toggle extends Vue {
  @Prop() value!: boolean;

  private internalValue = false;

  created() {
    if (this.value) this.internalValue = this.value;
  }

  toggle() {
    this.internalValue = !this.internalValue;
    this.$emit('input', this.internalValue);
  }
}
</script>
