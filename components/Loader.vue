<script setup lang="ts">
import { EventBus } from '~/event-bus.js'
import { ref, onMounted } from 'vue'

const show = ref(false)

const handleLoading = (data: any) => {
  show.value = data.show
}

onMounted(() => {
  EventBus.on('loading', (data: any) => {
    handleLoading(data)
  })
})
</script>

<template>
  <div>
    <div class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50" v-if="show">
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stop-color="#ffe4e6" stop-opacity="0" offset="0%" />
            <stop stop-color="#fecdd3" stop-opacity=".2" offset="20%" />
            <stop stop-color="#fda4af" stop-opacity=".4" offset="40%" />
            <stop stop-color="#fb7185" stop-opacity=".6" offset="60%" />
            <stop stop-color="#f43f5e" stop-opacity=".8" offset="80%" />
            <stop stop-color="#e11d48" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
              <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s"
                repeatCount="indefinite" />
            </path>
            <circle fill="#e11d48" cx="36" cy="18" r="1">
              <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s"
                repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>
