<template>
	<slot></slot>
</template>

<script>
export default {
	name: 'notifications',
	props: {
		target: {
			type: String,
			default: '.notifications',
		},
	},
};
</script>