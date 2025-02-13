<template>
    <header class="flex justify-between items-center pt-2 px-2 text-neutral-500 ">
        <div class="flex flex-col">
            <h1 class="text-4xl font-bold mb-2">Cajas misteriosas</h1>
            <h2 class="text-lg font-medium">Questionario sobre motivación</h2>
        </div>
        <div class="flex space-x-2">
            <button
                class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                @click="startNewGame">Nueva Partida</button>
            <div class="flex space-x-2">
                <div
                    class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Vidas: {{ gameState.lives }}
                </div>
                <div
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Puntos: {{ gameState.score }}
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const gameState = inject('gameState')
const startNewGame = inject('startNewGame')
const advanceGame = inject('advanceGame')
</script>
