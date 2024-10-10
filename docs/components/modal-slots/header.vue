<template>
  <h1>
    {{  title  }}
  </h1>
  <code style="background: #65a30d; padding: 1rem;">
		Header slot with prop
		<button @click.prevent="$emit('close')">
			Close here
		</button>
	</code>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
}>();

const emit = defineEmits<{
	close: [];
}>();
</script>
