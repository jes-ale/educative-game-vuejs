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
        type: Boolean,
        required: true,
    },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emits('update:modelValue', event.target.checked);
};
</script>

<template>
    <div class="p-4">
        <label :for="id" class="block mb-2">{{ label }}</label>
        <div class="relative inline-block w-10 h-6 select-none transition-all duration-200 ease-in-out">
            <!-- Toggle switch -->
            <input type="checkbox" id="toggle" :checked="modelValue" @change="updateValue($event)"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform transform translate-x-0" />
            <!-- Background track -->
            <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300"></label>
        </div>
    </div>
</template>


<style scoped>
.toggle-checkbox {
    left: 0;
    transition: transform 0.2s ease;
}

.toggle-checkbox:checked {
    transform: translateX(1rem);
    /* Move to the opposite end */
}

.toggle-label {
    transition: background-color 0.2s ease;
}

.toggle-checkbox:checked+.toggle-label {
    background-color: #4F46E5;
    /* Change to your desired active color */
}
</style>
