<template>
  <div class="messages">
    <div
        v-for="message in messages"
        :key="message.expiration"
        :class="['message', message.type.toString()]"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Message} from "@/interfaces/message.interface";

@Component
export default class Messages extends Vue {
  private tick = 0;

  created() {
    setInterval(() => this.tick++, 1000);
  }

  get messages(): Message[] {
    if (this.tick < 0) return []; // reactivity hack
    const messages: Message[] = this.$store.getters.currentMessages;
    return messages.filter(m => m.expiration > Date.now());
  }
}
</script>
