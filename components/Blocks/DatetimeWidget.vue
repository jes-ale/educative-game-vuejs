<!-- components/DateTimeWidget.vue -->
<template>
    <div class="datetime-widget">
        <p>Current Date and Time: {{ currentDateTime }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentDateTime = ref(new Date().toLocaleString());

onMounted(() => {
    setInterval(() => {
        currentDateTime.value = new Date().toLocaleString();
    }, 1000);
});
</script>

<style scoped>
.datetime-widget {
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
}
</style>
