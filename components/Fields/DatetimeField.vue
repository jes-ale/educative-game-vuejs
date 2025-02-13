<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emits('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="p-4 mb-4">
        <label :for="id" class="block mb-2">{{ label }}</label>
        <input type="date" :id="id" :value="modelValue" @input="updateValue" class="p-2 w-full border border-black" />
    </div>
</template>

<style scoped></style>
