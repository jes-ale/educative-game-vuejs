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
        type: Number,
        required: true,
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emits('update:modelValue', parseFloat(event.target.value));
};
</script>

<template>
    <div class="border border-black p-4 mb-4">
        <label :for="id" class="block mb-2">{{ label }}</label>
        <input type="number" :id="id" :value="modelValue" @input="updateValue" class="border p-2 w-full" />
    </div>
</template>


<style scoped></style>
