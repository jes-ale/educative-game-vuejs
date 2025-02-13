<script setup lang="ts">
import { EventBus } from '~/event-bus.js'
interface Toast {
  show: boolean
  type: string
  title: string
  message: string
  action: string
  payload: any
}
const toastPile = ref<Toast[]>([])
onMounted(() => {
  EventBus.on('notify', (data: any) => {
    handleNotification(data)
  })
})

function handleNotification(data: Toast) {
  toastPile.value.push({
    show: true,
    type: data.type,
    title: data.title,
    message: data.message,
    action: data.action,
    payload: data.payload,
  })

  setTimeout(() => {
    toastPile.value[0].show = false
  }, 9000)

  setTimeout(() => {
    toastPile.value.splice(0, 1)
  }, 10000)
}

function performAction(index: number) {
  close(index)
}
function close(index: number) {
  toastPile.value[index].show = false
  toastPile.value.splice(0, 1)
}
</script>

<template>
  <div v-if="toastPile.length > 0"
    class="h-auto w-full lg:w-1/4 p-6 space-y-1 flex-col text-md text-left font-sans absolute bottom-0 right-0 z-50 overflow-auto">
    <div v-for="(toastItem, index) in toastPile" :key="index" class="shadow-xl flex">
      <div class="w-full h-1/8 border rounded" :class="[toastItem.show ? 'animate-fade-in' : 'animate-fade-out']">
        <div class="w-full h-full" v-if="toastItem.type === 'success'">
          <button
            class="text-left h-full w-full p-2 rounded border border-transparent  bg-green-300 bg-opacity-50 hover:bg-opacity-25"
            @click="close(index)">
            <h1 class="text-lg flex font-bold text-emerald-700" v-text="toastItem.title" />
            <p class="text-sm h-24 text-emerald-700">
              {{ toastItem.message }}
            </p>
          </button>
        </div>
        <div class="w-full h-full" v-if="toastItem.type === 'warning'">
          <button
            class="text-left h-full w-full p-2 rounded  border border-transparent  bg-yellow-300 bg-opacity-50 hover:bg-opacity-25"
            @click="performAction(index)">
            <h1 class="text-lg flex font-bold text-amber-700" v-text="`${toastItem.title} `" />
            <p class="text-sm h-24 text-amber-700">
              {{ toastItem.message }}
            </p>
          </button>
        </div>
        <div class="w-full h-full" v-if="toastItem.type === 'failure'">
          <button
            class="text-left h-full w-full p-2 rounded  border border-transparent bg-red-300  bg-opacity-50 hover:bg-opacity-25"
            @click="close(index)">
            <h1 class="text-lg flex font-bold text-red-700" v-text="toastItem.title" />
            <p class="text-sm h-24 text-red-700">
              {{ toastItem.message }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
