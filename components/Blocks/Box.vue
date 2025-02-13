<template>
    <div class="box" :class="{ opened: box.opened, success: box.success }" @click="select">
        <div class="box-face front" :class="{ opened: box.opened }">
            <Icon :icon="box.icon" class="text-3xl" />
        </div>
        <div class="box-face back" :class="{ opened: box.opened }">
            <Icon :icon="box.icon" class="text-3xl" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defineProps, defineEmits } from 'vue'

const { box } = defineProps({
    box: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['select'])

function select() {
    // Emit the select event to the parent component
    if (!box.opened) {
        emit('select', box.id)
    }
}
</script>

<style scoped>
.box {
    width: 120px;
    height: 120px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    cursor: pointer;
}

.box.opened {
    transform: rotateY(180deg);
}

.box.success {
    background-color: #c6efce;
    border: 1px solid #3e8e41;
    box-shadow: 0 0 10px rgba(0, 128, 0, 0.2);
}

.box-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.front {
    background-color: #fff;
    transform: rotateY(0deg);
    z-index: 2;
}

.back {
    background-color: #ccc;
    transform: rotateY(180deg);
    z-index: 1;
}

.front.opened {
    transform: rotateY(-180deg);
}

.back.opened {
    transform: rotateY(0deg);
}

.box-face {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box-face p {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.box.opened .front {
    opacity: 0.5;
}

.box.opened .back {
    opacity: 1;
}
</style>
