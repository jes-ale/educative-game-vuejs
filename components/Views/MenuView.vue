<template>
    <div class="border p-4 mb-4">
        <ul class="space-y-2">
            <li v-for="item in items" :key="item.id" class="border-b p-2">
                <a :href="item.link" class="text-blue-500 hover:underline">{{ item.label }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pocketbase from '~/pocketbase'; // Assuming you have a Pocketbase instance setup

const items = ref([]);

const fetchMenuItems = async () => {
    const response = await pocketbase.collection('menu').getFullList();
    items.value = response.map(item => ({
        id: item.id,
        label: item.label,
        link: item.link,
    }));
};

onMounted(fetchMenuItems);
</script>

<style scoped></style>
