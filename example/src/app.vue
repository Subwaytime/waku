<template>
	<div class="wrapper">
		<div>
			<p>
				The Snackbar Button will add a tiny Snackbar on the top right!
				<br>
				It will also teleport the Snackbar directly into <code style="background: #ff6b6b; padding: 0.25rem;">.notifications</code>
			</p>
			<button @click.prevent="addSnackbar('This is fun!')">
				Add Snackbar
			</button>
		</div>
		<div>
			<p>
				The Tag Button will just add a HTML Tag to the DOM.
			</p>
			<button @click.prevent="addTag('h3')">
				Add H3 Tag
			</button>
		</div>
		<div>
			<p>
				The Modal Button on the other hand will mount a Modal without teleporting it.
			</p>
			<button @click.prevent="addModal">
				Add Modal
			</button>
		</div>
		<div>
			<p>
				Adds a Toast with random Messages via Props!
			</p>
			<button @click.prevent="addOptions">
				Add Toast
			</button>
		</div>
		<div>
			<p>
				Remove all created Elements
			</p>
			<button @click.prevent="dismountAll">
				Dismount All
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { dismountAll, mount } from '../../dist/index';
import modal from '~components/modal/index.vue';
import modalTest from '~components/modal/test.vue';
import modalBody from '~components/modal/body.vue';
import modalFooter from '~components/modal/footer.vue';
import snackbar from '~components/snackbar.vue';
import tagBody from '~components/tagBody.vue';
import toast from '~components/toast.vue';
import notification from '~components/notification.vue';

let counter = 0;

function addSnackbar(message) {
	mount(notification, {
		children: [
			{
				component: snackbar,
				props: {
					counted: counter++,
					message
				}
			}
		]
	});
}

function addTag(tag: string) {
	mount(tag, {
		children: tagBody
	});
}

function addModal() {
	const { hide } = mount(modal, {
		children: [
			modalTest,
			{
				component: modalBody,
				slot: 'body',
				props: {
					ok: 'hmm'
				}
			},
			{
				component: modalFooter,
				slot: 'footer'
			}
		],
		props: {
			message: 'test'
		}
	});
}

function addOptions() {
	const messages = [
		'crazy',
		'mega',
		'super',
		'ultra',
		'nice'
	];

	h(toast);

	mount(toast, {
		props: {
			message: messages[Math.floor(Math.random() * messages.length)]
		}
	});
}
</script>

<style lang="css">
	body {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		align-items: center;
		background: #e9ecef;
		display: flex;
		height: 100vh;
		justify-content: center;
		margin: 0;
		padding: 0;
		text-align: center;
		width: 100%;
	}

	p {
		margin: 0;
		padding: 0 1em 1em;
		text-align: justify;
	}

	.wrapper {
		align-items: center;
		background: #f8f9fa;
		border-radius: 1rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-flow: column wrap;
		justify-content: space-between;
		margin: 0 auto;
		padding: 1.5rem;
		width: 24rem;
	}

	.wrapper > div {
		align-items: center;
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		padding: 1rem;
		flex: 1 1 auto;
	}

	.wrapper button {
		appearance: none;
		background: #151515;
		border-radius: 0.25rem;
		padding: 1rem 1.5rem;
		color: #FAFAFA;
		cursor: pointer;
		border: 0 none;
	}

	h3 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
