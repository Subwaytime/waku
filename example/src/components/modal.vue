<template>
	<div ref="modal" class="modal">
    	<h1>
			{{ message }}
		</h1>
		<slot />
		<slot name="header" @close="close" />
		<div v-if="testEmit">
			<button @click.prevent="$emit('example')">
				<IconPhConfetti />
			</button>
		</div>
		<button @click.prevent="close">
			<IconPhX />
		</button>
	</div>
</template>

<script setup lang="ts">
interface Props {
  mountedId: string
  message?: string,
  testEmit?: boolean
}

const { mountedId, message = 'I am a modal!', testEmit = false } = defineProps<Props>();

const emit = defineEmits<{
  destroy: [],
  example: []
}>();

function close() {
	emit('destroy');
}

console.log(`mountedId: ${mountedId}`, `message: ${message}`);
</script>

<style lang="css">
	.modal {
		align-items: center;
		/* position: fixed; */
		display: flex;
		flex-flow: column;
		top: 0;
		bottom: 0;
		background: #FAFAFA;
		justify-content: center;
		left: 0;
		right: 0;
		padding: 2em;
		overflow: hidden;
		z-index: 1000;
		gap: 1em;
	}

	.modal > button {
		appearance: none;
		background: #C1C1C1;
    border-radius: 100%;
		border: 0 none;
		color: #151515;
		cursor: pointer;
    display: flex;
		position: absolute;
		padding: 0.25rem;
		top: 1em;
		right: 1em;

    > svg {
      font-size: 1.25em;
    }
	}
</style>
