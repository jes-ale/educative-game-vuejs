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
        type: [String, Number],
        required: true,
    },
    options: {
        type: Array,
        default: () => [],
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
        <select :id="id" :value="modelValue" @input="updateValue" class="border border-black  p-2 w-full">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>


<style scoped></style>
