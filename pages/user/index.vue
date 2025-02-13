<script setup>
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, Autoplay, Parallax, EffectCreative } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
const modules = [Navigation, Pagination, Scrollbar, Autoplay, Parallax, EffectCreative]
import GridActionPad from '~/components/Blocks/GridActionPad.vue';
import ListView from '~/components/Views/ListView.vue';
import Header from '~/components/Blocks/Header.vue';
import { Icon } from '@iconify/vue'
const { t } = useI18n()

const menus = ref([
  {
    name: 'ERP',
    menuItems: [
      { id: 0, name: 'Create', link: '/user/form', icon: 'codicon:new-file' },
      { id: 1, name: 'List', link: '/user/list', icon: 'mdi:table-large' },
    ]
  }]
);
</script>
<template>
  <div>
    <NuxtLayout name="default">
      <div class="w-full h-full flex items-center justify-center">
        <Swiper :slides-per-view="1" :space-between="5" navigation :scrollbar="{ draggable: true }" :modules="modules"
          :pagination="{ clickable: true }" class="flex w-full h-full justify-center items-center">
          <SwiperSlide v-for="menu in menus" :key="menu.name" class="flex w-full h-full text-center font-bold text-xs">
            <div class="text-black relative w-full h-full flex items-center justify-center">
              <GridActionPad :items="menu.menuItems" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </NuxtLayout>
  </div>
</template>
