<template>
    <div class="w-auto px-4 grid grid-cols-5 gap-2">
        <Box v-for="(box, index) in gameState.boxes" :key="index" :box="box" @select="openBox" />
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import Box from './Box.vue'

const gameState = inject('gameState')
const openBox = inject('openBox')
</script>
