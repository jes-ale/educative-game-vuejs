<template>
    <div class="border p-4 mb-4">
        <label :for="id" class="block mb-2">{{ label }}</label>
        <input type="file" :id="id" @change="handleFileChange" class="border p-2 w-full border-black" />
        <p v-if="fileName">{{ fileName }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: String,
    label: String,
});

const emits = defineEmits(['update:modelValue']);

const fileName = ref('');

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        fileName.value = file.name;
        const reader = new FileReader();
        reader.onload = () => {
            emits('update:modelValue', reader.result);
        };
        reader.readAsDataURL(file);
    }
};
</script>

<style scoped></style>
