<template>
  <div class="wrapper">
    <h1>
      Vue Mountable
    </h1>
    <nav>
      <ul>
        <li>
          <button @click.prevent="addComponent">
            Mount component
          </button>
        </li>
        <li>
          <button @click.prevent="addComponentWithProps">
            Mount component with props
          </button>
		  <br />
		<button @click.prevent="message = 'cool'">
			Change props
		  </button>
        </li>
        <li>
          <button @click.prevent="addComponentWithSlots">
            Mount component with slots
          </button>
        </li>
		<li>
          <button @click.prevent="addComponentWithEmits">
            Mount component with emits
          </button>
        </li>
        <li>
          <button @click.prevent="addComponentAndTeleport">
            Mount & Teleport component
          </button>
        </li>
        <li>
          <button @click.prevent="addComponentViaStore">
            Mount component via pinia/store
          </button>
        </li>
        <li>
          <button @click.prevent="removeComponent">
            Unmount component
          </button>
        </li>
        <li>
          <button @click.prevent="unmountAllComponents">
            Unmount all components
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { mountComponent, unmountComponent, unmountAllComponents, type MountedComponentInstance } from '../../dist/index';
import Modal from '~components/modal.vue';
import DefaultSlotComponent from '~components/modal-slots/default.vue';
import HeaderSlotComponent from '~components/modal-slots/header.vue';
import { useExampleStore } from './store';

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

.wrapper > nav ul {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-flow: column wrap;
  gap: 1em;
  justify-content: center;
  list-style: none;
  padding: 1rem;
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
