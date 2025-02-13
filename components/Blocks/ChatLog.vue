<template>
    <div class="overflow-y-auto w-full h-48 p-4 border border-black">
        <p v-for="(log, index) in gameState.gameLog" :key="index">{{ log }}</p>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const gameState = inject('gameState')
</script>
