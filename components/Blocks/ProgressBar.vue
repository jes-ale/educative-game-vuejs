<template>
    <div class="flex justify-between mb-4">
        <p class="text-lg font-bold">Player 1: {{ player1Score }}%</p>
        <p class="text-lg font-bold">Player 2: {{ player2Score }}%</p>
        <div class="bg-gray-200 h-4 rounded">
            <div class="bg-orange-500 h-4 rounded" :style="{ width: player1Score + '%' }"></div>
            <div class="bg-orange-500 h-4 rounded" :style="{ width: player2Score + '%' }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

const gameState = inject('gameState')

const player1Score = computed(() => {
    // Calculate player 1's score based on game state
    return 50
})

const player2Score = computed(() => {
    // Calculate player 2's score based on game state
    return 30
})
</script>
