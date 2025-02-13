<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(path => path);
    return paths.map((path, index) => ({
        name: path,
        path: '/' + paths.slice(0, index + 1).join('/'),
    }));
});

const navigateTo = path => {
    router.push(path);
};

const navigateHome = () => {
    // Use replace to go back to the app index and reset history
    router.replace('/');
};
</script>

<template>
    <nav aria-label="breadcrumb" class="w-full px-2">
        <ol class="flex space-x-2 w-full">
            <li>
                <!-- Home button -->
                <span @click="navigateHome"
                    class="cursor-pointer text-rose-700 font-bold hover:text-rose-50 hover:bg-rose-700 px-2 py-1">
                    Home
                </span>
                <span v-if="breadcrumbs.length > 0" class="px-2 py-1"> / </span>
            </li>
            <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <span v-if="index < breadcrumbs.length - 1" @click="navigateTo(breadcrumb.path)"
                    class="cursor-pointer text-rose-700 font-bold hover:text-rose-50 hover:bg-rose-700 px-2 py-1">
                    {{ breadcrumb.name }}
                </span>
                <span v-else class="font-bold px-2 py-1">
                    {{ breadcrumb.name }}
                </span>
                <span v-if="index < breadcrumbs.length - 1"> / </span>
            </li>
        </ol>
    </nav>
</template>

<style scoped>
/* Additional styles can be added here */
</style>
