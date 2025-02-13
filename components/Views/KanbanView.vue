<template>
    <div class="border p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(column, index) in columns" :key="index" class="border p-4">
            <h3 class="text-lg font-bold mb-2">{{ column.title }}</h3>
            <div v-for="item in column.items" :key="item.id" class="border p-2 mb-2 bg-gray-100">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pocketbase from '~/pocketbase'; // Assuming you have a Pocketbase instance setup

const columns = ref([]);

const fetchKanbanColumns = async () => {
    const response = await pocketbase.collection('kanban_columns').getFullList({
        expand: 'items', // Assuming 'items' is a relation field in your Pocketbase collection
    });
    columns.value = response.map(column => ({
        title: column.title,
        items: column.expand.items.map(item => ({
            id: item.id,
            name: item.name,
        })),
    }));
};

onMounted(fetchKanbanColumns);
</script>

<style scoped></style>
