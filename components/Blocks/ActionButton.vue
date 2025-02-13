<script setup lang="ts">
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    icon: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        default: () => { }
    }
})

const buttonClass = `
  w-16 h-16 flex flex-col items-center justify-center
  border border-black p-2 bg-rose-700 text-white
  hover:bg-rose-100 hover:text-rose-700 font-bold
`
</script>

<template>
    <button :type="type" @click="onClick" :class="buttonClass">
        <Icon :icon="icon" class="w-full h-full" />
        <span>{{ label }}</span>
    </button>
</template>


<style scoped>
/* Additional styles if necessary */
</style>
