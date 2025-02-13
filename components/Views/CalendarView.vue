<template>
    <div class="border p-4">
        <h2 class="text-xl mb-4">{{ title }}</h2>
        <div>
            <!-- Placeholder for Calendar -->
            <div class="grid grid-cols-7 gap-2">
                <div v-for="day in days" :key="day" class="border p-2 text-center">{{ day }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Calendar',
    },
    days: {
        type: Array,
        default: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
});
</script>

<style scoped></style>
