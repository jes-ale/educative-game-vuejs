<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: String,
    label: String,
    modelValue: String,
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emits('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="p-4 mb-4">
        <label :for="id" class="block mb-2">{{ label }}</label>
        <input type="text" :id="id" :value="modelValue" @input="updateValue" class="border border-black p-2 w-full" />
    </div>
</template>


<style scoped></style>
