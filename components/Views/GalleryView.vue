<template>
    <div class="border p-4">
        <h2 class="text-xl mb-4">{{ title }}</h2>
        <div class="grid grid-cols-3 gap-4">
            <div v-for="image in images" :key="image.id" class="border p-2">
                <img :src="image.src" :alt="image.alt" class="w-full h-auto" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Gallery',
    },
    images: {
        type: Array,
        default: () => [],
    },
});
</script>

<style scoped></style>
