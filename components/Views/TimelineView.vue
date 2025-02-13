<template>
    <div class="border p-4">
        <h2 class="text-xl mb-4">{{ title }}</h2>
        <ul>
            <li v-for="event in events" :key="event.id" class="mb-4">
                <div class="border-b p-2">
                    <h3 class="text-lg">{{ event.date }}</h3>
                    <p>{{ event.description }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Timeline',
    },
    events: {
        type: Array,
        default: () => [],
    },
});
</script>

<style scoped></style>
