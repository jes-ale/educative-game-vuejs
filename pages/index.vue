<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Header from '~/components/Blocks/Header.vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import GridActionPad from '~/components/Blocks/GridActionPad.vue';
import { Navigation, Pagination, Scrollbar, Autoplay, Parallax, EffectCreative } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { usePocketBase } from '~/composables/usePocketBase'
const modules = [Navigation, Pagination, Scrollbar, Autoplay, Parallax, EffectCreative]
const { t } = useI18n()

const menus = ref([
  {
    name: 'Home',
    menuItems: [
      { id: 1, name: 'Entrar al juego', link: '/game', icon: "bxs:conversation" },
    ]
  }
]);
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div class="w-full h-full flex items-start justify-center flex-col overflow-auto">
        <div class="w-full h-auto flex items-start justify-center flex-grow">
          <Swiper :slides-per-view="1" :space-between="5" navigation :scrollbar="{ draggable: true }" :modules="modules"
            :pagination="{ clickable: true }" class="flex w-full h-full justify-center items-start">
            <SwiperSlide v-for="menu in menus" :key="menu.name"
              class="flex w-full h-full text-center justify-center font-bold text-xs">
              <div class="text-black relative w-full h-full flex flex-col space-y-2 items-center justify- pt-6 px-2">
                <h1 class="text-md p-2 border border-black w-auto bg-rose-100 font-bold"> {{ menu.name }} </h1>
                <GridActionPad :items="menu.menuItems" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style scoped>
/* .imageSlideBg { */
/*   background-image: url('/img/bg.jpg'); */
/*   background-size: cover; */
/*   -webkit-animation: slidein 100s; */
/*   animation: slidein 100s; */
/**/
/*   -webkit-animation-fill-mode: forwards; */
/*   animation-fill-mode: forwards; */
/**/
/*   -webkit-animation-iteration-count: infinite; */
/*   animation-iteration-count: infinite; */
/**/
/*   -webkit-animation-direction: alternate; */
/*   animation-direction: alternate; */
/* } */
/**/
@-webkit-keyframes slidein {
  from {
    background-position: top;
    background-size: 3000px;
  }

  to {
    background-position: -100px 0px;
    background-size: 2750px;
  }
}

@keyframes slidein {
  from {
    background-position: top;
    background-size: 3000px;
  }

  to {
    background-position: -100px 0px;
    background-size: 2750px;
  }

}



.center {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(75, 75, 250, 0.3);
  border-radius: 3px;
}

.center h1 {
  text-align: center;
  color: white;
  font-family: 'Source Code Pro', monospace;
  text-transform: uppercase;
}



.circles li {
  animation: animate 45s linear infinite;
}

@keyframes animate {

  0% {
    transform: translateY(0) rotate(0deg) translateX(0);
    opacity: 1;
    border-radius: 0;
  }

  25% {
    transform: translateX(50px);
  }

  50% {
    transform: translateX(-50px);
  }

  75% {
    transform: translateX(50px);
  }

  100% {
    transform: translateY(-1000px) rotate(720deg) translateX(50px);
    opacity: 1;
    border-radius: 50%;
  }

}

@import 'tailwindcss/tailwind.css';
</style>
