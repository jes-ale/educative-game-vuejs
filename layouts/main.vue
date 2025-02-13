<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Toast from '~/components/Toast.vue';
const { t } = useI18n()
</script>
<template>
  <main class="relative flex flex-col no-scrollbar overflow-y-scroll h-screen w-screen text-black text-sm bg-rose-200
      font-sans subpixel-antialiased slashed-zero diagonal-fractions">
    <Toast />
    <section as="div" class="w-full h-full">
      <slot />
    </section>
  </main>
</template>
