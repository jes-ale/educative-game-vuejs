<!-- components/ConnectedUsersWidget.vue -->
<template>
    <div class="px-4 py-1 border border-neutral-900 ml-2">
        <p> Usuarios: {{ connectedUsers }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePocketBase } from '@/composables/usePocketBase'

const { pb } = usePocketBase();
const connectedUsers = ref(0);

const updateConnectedUsers = async () => {
    try {
        const users = await pb.collection('internal_users').getFullList({
            filter: 'is_connected=true'
        });
        connectedUsers.value = users.length;
    } catch (error) {
        console.error('Failed to fetch connected users:', error);
    }
};

onMounted(() => {
    updateConnectedUsers();
    const intervalId = setInterval(updateConnectedUsers, 5000); // Update every 5 seconds

    onUnmounted(() => {
        clearInterval(intervalId);
    });
});
</script>
