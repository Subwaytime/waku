<template>
	<div class="modal" ref="modal">
		<h1>
			{{ message }}
		</h1>
		<slot name="body"></slot>
		<slot name="footer"></slot>
		<button @click.prevent="close">
			<svg
				width="32"
				height="32"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useComponent } from '../../../src';

export default {
	name: 'modal',
	props: {
		message: {
			type: String
		}
	},
	setup() {
		const modal = ref(null);
		const { destroy } = useComponent();

		function close() {
			destroy(modal.value);
		}

		return {
			close,
			modal
		}
	}
}
</script>

<style lang="css">
	.modal {
		align-items: center;
		position: fixed;
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
		background: transparent;
		border: 0 none;
		color: #151515;
		cursor: pointer;
		position: absolute;
		padding: 2rem;
		top: 0;
		right: 0;
	}
</style>