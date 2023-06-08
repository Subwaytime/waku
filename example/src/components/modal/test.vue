<template>
	<div>
		{{ id }}
		<code style="background: #f06595; padding: 1rem;">
			i am a default slot component (modalTest)
		</code>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	id: string
}>();
</script>
