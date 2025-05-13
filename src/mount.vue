<template>
    <div class="waku-mountpoint">
        <component
            v-for="item in items"
            :key="item.id"
            :is="item.vNode"
            v-memo="[item.id]"
        />
    </div>
</template>

<script setup lang="ts">
import { useWaku } from './core';

const { items } = useWaku();

defineOptions({
    name: 'WakuMountPoint'
});
</script>

<style scoped>
.waku-mountpoint {
    display: contents;
}
</style>