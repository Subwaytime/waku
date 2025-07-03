<template>
    <div class="waku-mountpoint" v-if="items && items.length > 0">
        <component
            v-for="item in activeItems"
            :key="item.id"
            :is="item.vNode"
            v-memo="[item.id]"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWaku } from './core';

const { items } = useWaku();

const activeItems = computed(() => items && items.length > 0 ? items.filter(item => item.visible) : []);

defineOptions({
    name: 'WakuMountPoint'
});
</script>

<style scoped>
.waku-mountpoint {
    display: contents;
}
</style>