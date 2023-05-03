<template>
  <slot />
</template>

<script setup lang="ts">
defineProps({
  target: {
    type: String,
    default: '.notifications',
  }
});

const emits = defineEmits(['submit']);

function submit() {
  console.log('click');
  emits('submit');
}
</script>

<style lang="css">
.notifications {
	position: fixed;
	display: flex;
	flex-flow: column;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 2em;
	overflow: hidden;
	z-index: 1000;
	pointer-events: none;
	gap: 1em;
}

.sub {
  pointer-events: all;
}
</style>
