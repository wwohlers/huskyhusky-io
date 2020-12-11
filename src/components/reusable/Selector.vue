<template>
  <div class="selector">
    <div
        class="selector__selected"
        @click="showDropdown = !showDropdown ">{{ internalValue }}</div>
    <img
        @click="showDropdown = !showDropdown"
        :class="{ 'selector__icon': true, icon: true, reversed: showDropdown }"
        src="../../assets/images/Up.svg" />
    <transition name="slide-down">
      <div class="selector__dropdown" v-if="showDropdown">
        <div class="selector__dropdown__option" @click="selectOption(null)">{{ defaultValue }}</div>
        <div
            class="selector__dropdown__option"
            v-for="option in otherOptions"
            :key="option"
            @click="selectOption(option)"
        >{{ option }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component
export default class Selector extends Vue {
  @Prop() options!: string[];
  @Prop() defaultValue!: string;
  @Prop() value!: string | null;

  private internalValue = "";
  private showDropdown = false;

  created() {
    this.updateValue(this.value);
  }

  /**
   * Get all options that are not currently selected.
   */
  get otherOptions(): string[] {
    if (this.internalValue === this.defaultValue) return this.options;
    else return this.options.filter(o => o !== this.internalValue);
  }

  /**
   * Update the internal value (if the prop changes).
   * @param valueProp
   */
  updateValue(valueProp: string | null) {
    if (valueProp && this.options.includes(valueProp)) {
      this.internalValue = valueProp;
    } else {
      this.internalValue = this.defaultValue;
    }
  }

  selectOption(option: string | null) {
    this.showDropdown = false;
    this.internalValue = option || this.defaultValue;
    this.$emit('input', option);
  }

  @Watch('value')
  watchValue(value: string) {
    this.updateValue(value);
  }
}
</script>
