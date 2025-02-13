<template>
    <div class="w-full flex justify-center">
        <div class="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-4">
            <NuxtLink :to="item.link" v-for="item in items" :key="item.id"
                class="border border-black p-2 h-32 w-32 flex flex-col items-center justify-center hover:scale-105 hover:bg-rose-100 hover:font-bold hover:shadow-lg">
                <Icon :icon="item.icon" class="w-full h-full" />
                <span class="text-sm">
                    {{ item.name }}
                </span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

</script>
