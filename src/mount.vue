<template>
    <div class="waku-mount">
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
</script>

<style scoped>
.waku-mount {
    display: contents;
}
</style>