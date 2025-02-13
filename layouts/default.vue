<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Loader from '~/components/Loader.vue';
import Toast from '~/components/Toast.vue';
import Header from '~/components/Blocks/Header.vue';
import { EventBus } from '~/event-bus.ts';
import { ref, computed, onMounted, onBeforeMount } from 'vue';

const { isLoggedIn } = usePocketBase()

const { start } = usePocketBase();
onBeforeMount(async () => {
  try {
    EventBus.emit('loading', { show: true });
    await start()
  } catch (error) {
    console.error('Error Loading Auth:', error);
  } finally {
    EventBus.emit('loading', { show: false });
  }
})

const { t } = useI18n()

</script>
<template>
  <main class="relative flex flex-col no-scrollbar overflow-y-scroll h-screen w-screen  text-sm bg-rose-200 text-neutral-900
      font-sans subpixel-antialiased slashed-zero diagonal-fractions">
    <Toast />
    <Loader />
    <!-- Main panel start -->
    <section as="div" class="w-full h-full" v-if="isLoggedIn">
      <Header class="w-screen h-auto" />
      <slot />
    </section>

    <section as="div" class="w-full h-full" v-else>
      <div class="w-full h-full flex ">
        <div class="flex flex-col space-y-2 items-center justify-center w-full h-full px-16">
          <div
            class="font-bold bg-opacity-25 h-12 w-full lg:w-1/5 cursor-pointer flex space-x-2 items-center justify-center   transform transition-transform hover:text-rose-500 hover:font-bold hover:scale-90">
            ~ 401 Access Denied ~
          </div>
          <NuxtLink to="/login"
            class="bg-opacity-25 bg-neutral-50 h-12 w-full lg:w-1/5 cursor-pointer flex space-x-2 items-center justify-center bg-light-200 border border-black transform transition-transform hover:text-rose-500 hover:font-bold hover:scale-90">
            <span>{{ t('Access') }} </span>
            <Icon icon="mdi:terminal" />
          </NuxtLink>
          <div to="/contact"
            class="bg-opacity-25 bg-neutral-50 h-12 w-full lg:w-1/5 cursor-pointer flex space-x-2 items-center justify-center bg-light-200 border border-black transform transition-transform hover:text-rose-500 hover:font-bold hover:scale-90">
            <span>{{ t('Contact') }} </span>
            <Icon icon="mdi:send" class="" />
          </div>
          <div to="/about"
            class="bg-opacity-25 bg-neutral-50 h-12 w-full lg:w-1/5 cursor-pointer flex space-x-2 items-center justify-center bg-light-200 border border-black transform transition-transform hover:text-rose-500 hover:font-bold hover:scale-90">
            <span>{{ t('About') }} </span>
            <Icon icon="mdi:about" class="" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
