# Examples

## Basic
<VPButton class="button" theme="alt" text="Mount component" @click.prevent="addComponent" />

## Props
<VPButton class="button" theme="alt" text="Mount component with props" @click.prevent="addComponentWithProps" />

## Slots
<VPButton class="button" theme="alt" text="Mount component with slots" @click.prevent="addComponentWithSlots" />

## Emits
<VPButton class="button" theme="alt" text="Mount component with emits" @click.prevent="addComponentWithEmits" />

## Teleport
<VPButton class="button" theme="alt" text="Mount & Teleport component" @click.prevent="addComponentAndTeleport" />

## Store
<VPButton class="button" theme="alt" text="Mount component via pinia/store" @click.prevent="addComponentViaStore" />

## Unmount
<VPButton class="button" theme="alt" text="Unmount component" @click.prevent="removeComponent" />

## Unmount all
<VPButton class="button" theme="alt" text="Unmount all components" @click.prevent="unmountAllComponents" />

<script setup lang="ts">
import { ref } from 'vue';
import { mountComponent, unmountComponent, unmountAllComponents, type MountedComponentInstance } from 'vue-mountable';
import Modal from '../components/modal.vue';
import DefaultSlotComponent from '../components/modal-slots/default.vue';
import HeaderSlotComponent from '../components/modal-slots/header.vue';
import { VPButton } from 'vitepress/theme';
import { useExampleStore } from '../.vitepress/theme/store.ts';

// NOTE: Saving a component to a ref, won't remove it from the DOM if the ref is changed!
const currentComponent = ref<MountedComponentInstance | null>(null);
const message = ref('I am a Modal with Props!');

const { addComponentViaStore } = useExampleStore();

function addComponent() {
  currentComponent.value = mountComponent(Modal);
}

function addComponentWithProps() {
  currentComponent.value = mountComponent({
	component: Modal,
    props: {
		// NOTE: Props are also reactive if you use a ref/reactive
		message
	}
  });
}

function addComponentWithSlots() {
  currentComponent.value = mountComponent({
	component: Modal,
	slots: [
		DefaultSlotComponent, // This will always be assigned to the DEFAULT Slot
		{
			slotName: 'header',
			component: HeaderSlotComponent,
			props: {
				title: 'I am the header slot!'
			}
		}
	]
  });
}

function addComponentWithEmits() {
	currentComponent.value = mountComponent({
		component: Modal,
		props: {
			testEmit: true // show the confetti emit button - not needed for emits just for this Example
		},
		emits: {
			onExample() {
				alert('This works nicely!');
			}
		}
	})
}

function addComponentAndTeleport() {
  currentComponent.value = mountComponent({
    component: Modal,
    props: {
      message: 'I am a teleported Modal!'
    },
    target: '.notifications'
  });
}

function removeComponent() {
  // OPTION 1 - save the component in a ref and call destroy
  currentComponent.value?.destroy();

  // OPTION 2 - call unmountComponent seperately and pass over the mounted component id
  // unmountComponent(ADD_YOUR_COMPONENT_ID);
}

</script>

<style>
  .example-container {
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;
    padding: 12px 0;
  }

  .button {
    text-align: left;
    width: max-content;
  }
</style>
