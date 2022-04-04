<template>
	<div ref="snackbar" class="snackbar">
		<span>
			{{ message }} {{ counted }}
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
import { useNotify } from '@utils/useNotify';

const props = defineProps({
	message: {
		type: String,
		required: true,
	},
	counted: Number,
	position: {
		type: String,
		default: 'top-right',
		validator(value) {
			return ['bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right'].indexOf(value) > -1;
		},
	},
});

const snackbar = ref(null);
const { removeNotification } = useNotify();

function close() {
	removeNotification(snackbar.value);
}
</script>

<style lang="css">
.snackbar {
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

.snackbar > span {
	flex: 1 0 auto;
	padding: 1rem;
	text-align: left;
}

.snackbar > button {
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
