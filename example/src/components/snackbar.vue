<template>
	<div ref="snackbar" class="snackbar">
		<button
			class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			@click.prevent="close"
		>
			<span class="sr-only">Close</span>
			<svg
				class="h-5 w-5"
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
import { useNotify } from '@utils/useNotify';

export default {
	name: 'snackbar',
	props: {
		message: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			default: 'top-right',
			validator(value) {
				return ['bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right'].indexOf(value) > -1;
			},
		},
	},
	setup() {
		const snackbar = ref(null);
		const { removeNotification } = useNotify();

		function close() {
			removeNotification(snackbar.value);
		}

		return {
			close,
			snackbar,
		};
	},
};
</script>

<style lang="css">
.snackbar {
	align-items: center;
	display: flex;
	justify-content: space-between;
	position: absolute;
	top: 40px;
	right: 40px;
}
</style>
