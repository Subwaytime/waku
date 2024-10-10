<template>
  <div class="overlay">
    <div ref="modal" class="modal vp-doc" v-on-click-outside="close">
      <h1 v-if="!testEmit">
        {{ message }}
      </h1>
      <slot />
      <slot name="header" @close="close" />
      <div v-if="testEmit">
        <button class="emit-button" @click.prevent="$emit('example')">
          <h1> click me! </h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="36" width="36"><path d="M40.49,205.52,93,61.14a7.79,7.79,0,0,1,12.84-2.85l91.88,91.88A7.79,7.79,0,0,1,194.86,163L50.48,215.51A7.79,7.79,0,0,1,40.49,205.52Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,72s0-24,24-24,24-24,24-24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="144" y1="16" x2="144" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="216" y1="112" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="216" y1="80" x2="240" y2="72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="78.09" y1="102.09" x2="153.91" y2="177.91" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="101.11" y1="197.11" x2="58.89" y2="154.89" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        </button>
      </div>
      <button class="close-button" @click.prevent="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="24" width="24"><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { vOnClickOutside } from "@vueuse/components";

interface Props {
	mountedId: string;
	message?: string;
	testEmit?: boolean;
}

const {
	mountedId,
	message = "I am a modal!",
	testEmit = false,
} = defineProps<Props>();

const emit = defineEmits<{
	destroy: [];
	example: [];
}>();

function close() {
	emit("destroy");
}

console.log(`mountedId: ${mountedId}`, `message: ${message}`);
onMounted(() => document.body.classList.add("overlay-open"));
onUnmounted(() => document.body.classList.remove("overlay-open"));
</script>

<style lang="css">
.overlay {
  align-items: center;
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  inset: 0;
  position: fixed;
  z-index: 999;
}

.modal {
  align-items: center;
  background: var(--vp-button-alt-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  display: flex;
  height: 400px;
  flex-flow: column;
  filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  justify-content: center;
  padding: 2em;
  overflow: hidden;
  width: 500px;
  z-index: 1000;
}

.modal > h1 {
  text-align: center;
}

.close-button {
  align-items: center;
  background: #C1C1C1;
  border-radius: 100%;
  color: #151515;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: absolute;
  padding: 0.25rem;
  top: 1em;
  right: 1em;
}

.emit-button {
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 10px
}
</style>
