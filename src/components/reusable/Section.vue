<template>
  <div class="section">
    <div class="section__toggle" @click="show = !show">
      {{ name }}
      <img :class="{ icon: true, reversed: show }" src="../../assets/images/Up.svg" />
    </div>
    <transition name="slide-down">
      <div v-if="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Section extends Vue {
  private show = false;
  @Prop() name!: string;
}
</script>
