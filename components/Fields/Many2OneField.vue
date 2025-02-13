<script setup>

const { pb } = usePocketBase();
const props = defineProps({
    label: String,
    collection: String,
    modelValue: [String, Number],
});

const emits = defineEmits(['update:modelValue']);

const items = ref([]);
const selectedItem = ref(props.modelValue);

onMounted(async () => {
    const response = await pb.collection(props.collection).getFullList();
    items.value = response;
});

watch(selectedItem, (newValue) => {
    emits('update:modelValue', newValue);
});
</script>

<template>
    <div class=" p-4 mb-4">
        <label class="block mb-2">{{ label }}</label>
        <select v-model="selectedItem" class="border border-black p-2 w-full">
            <option v-for="item in items" :key="item.id" :value="item.id">
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<style scoped></style>
