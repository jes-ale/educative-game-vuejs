<script setup>

const { pb } = usePocketBase();

const props = defineProps({
    label: String,
    collection: String,
    modelValue: Array,
});

const emits = defineEmits(['update:modelValue']);

const items = ref([]);
const selectedItems = ref([...props.modelValue]);

const isSelected = (item) => selectedItems.value.some((selected) => selected.id === item.id);

const toggleSelection = (item) => {
    if (isSelected(item)) {
        selectedItems.value = selectedItems.value.filter((selected) => selected.id !== item.id);
    } else {
        selectedItems.value.push(item);
    }
    emits('update:modelValue', selectedItems.value);
};

onMounted(async () => {
    const response = await pb.collection(props.collection).getFullList();
    items.value = response;
});
</script>

<template>
    <div class="p-4 mb-4">
        <label class="block mb-2">{{ label }}</label>
        <div class="flex flex-wrap gap-2 border border-black ">
            <div v-for="item in items" :key="item.id" @click="toggleSelection(item)" :class="{
                'border p-2 cursor-pointer': true,
                'bg-blue-500 text-white': isSelected(item),
                'bg-gray-100': !isSelected(item),
            }">
                {{ item.name }}
            </div>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
            <span v-for="item in selectedItems" :key="item.id" class="border p-2 bg-blue-500 text-white">
                {{ item.name }}
            </span>
        </div>
    </div>
</template>

<style scoped></style>
