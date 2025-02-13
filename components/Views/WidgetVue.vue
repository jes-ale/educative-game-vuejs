<template>
    <div class="border p-4">
        <h1 class="text-2xl mb-4">Dashboard</h1>
        <div class="grid grid-cols-3 gap-4">
            <div v-for="widget in widgets" :key="widget.id" class="border p-4">
                <h2 class="text-xl">{{ widget.title }}</h2>
                <p>{{ widget.content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const widgets = ref([
    { id: 1, title: 'Widget 1', content: 'Content 1' },
    { id: 2, title: 'Widget 2', content: 'Content 2' },
    { id: 3, title: 'Widget 3', content: 'Content 3' },
]);
</script>

<style scoped></style>
