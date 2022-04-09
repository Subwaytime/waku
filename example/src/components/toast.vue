<template>
	<div ref="toast" class="toast">
		<span>
			i am a random message prop
			<span style="color: #CC0000;">
				{{ message }}
			</span>
		</span>
		<button
			@click.prevent="close"
		>
			<svg
				width="20"
				height="20"
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

<script setup>
import { useComponent } from '../../../dist/index.mjs';

const props = defineProps({
	message: {
		type: String,
		required: true
	},
	target: {
		type: String,
		default: '.notifications'
	}
});

const { destroy } = useComponent();
const toast = ref(null);

function close() {
	destroy(toast.value);
}
</script>

<style>
.toast {
	display: inline-flex;
	align-items: center;
	justify-content: space-around;
	animation-duration: .15s;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
	pointer-events: auto;
	background: #363636;
	color: #fff;
	max-width: 350px;
	margin-left: auto;
	width: 100%;
}

.toast > span {
	flex: 1 0 auto;
	padding: 1rem;
	text-align: left;
}

.toast > button {
	appearance: none;
	align-items: center;
	background: transparent;
	border: 0 none;
	cursor: pointer;
	color: #FAFAFA;
	display: flex;
	margin-left: auto;
	padding: 1rem;
}
</style>