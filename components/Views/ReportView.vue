<template>
    <div class="border p-4">
        <h2 class="text-xl mb-4">{{ title }}</h2>
        <div v-html="content" class="prose"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Report',
    },
    content: {
        type: String,
        default: '',
    },
});
</script>

<style scoped></style>
