<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const { t } = useI18n()
</script>
<template>
  <main class="relative flex flex-col no-scrollbar overflow-y-scroll h-screen w-screen text-black text-sm bg-neutral-100
      font-sans subpixel-antialiased slashed-zero diagonal-fractions">
    <Header class="w-screen h-auto" />
    <!-- Main panel start -->
    <section as="div" class="w-full h-full">
      <slot />
    </section>
  </main>
</template>
