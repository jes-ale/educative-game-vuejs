<template>
    <div class="avatar">
        <img :src="avatarSrc" :alt="avatarSrc" :class="avatarClass" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    avatarClass: {
        type: String,
        default: 'rounded-full'
    }
});

const avatarSrc = ref(props.src);

</script>

<style scoped>
.avatar {
    width: 48px;
    /* Ajusta el tamaño según tu diseño */
    height: 48px;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
