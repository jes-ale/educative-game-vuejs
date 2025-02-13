<script setup>
import { ref } from 'vue'
import { usePocketBase } from '@/composables/usePocketBase'
import { useRouter } from 'vue-router'
import { EventBus } from '~/event-bus'
const { t } = useI18n()
definePageMeta({
  layout: false,
})

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const { login } = usePocketBase()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  try {
    await login(email.value, password.value)
    setTimeout(() => {
      EventBus.emit('notify', {
        type: 'success',
        title: t('text.success'),
        message: t('text.successLogin'),
        action: 'close',
      })
    }, 500)

    setTimeout(() => {
      isLoading.value = false
      router.push('/')
    }, 1000)

  } catch (err) {
    setTimeout(() => {
      EventBus.emit('notify', {
        type: 'failure',
        title: t('text.failure'),
        message: `Usuario o clave no coinciden.`,
        action: 'close',
      })
      isLoading.value = false
    }, 3000)
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="main">
      <div class="login-container relative w-full h-full flex items-center justify-center p-4 md:p-16">
        <div :class="[isLoading ? 'spin-3d' : '']"
          class=" shadow-lg form-wrapper bg-opacity-25 bg-neutral-50 p-8 border border-neutral-900 transform transition-transform hover:scale-105 z-10 relative overflow-hidden">
          <h1 class="text-2xl font-bold mb-4">Login</h1>
          <form @submit.prevent="handleLogin">
            <div class="form-group mb-4">
              <label for="email" class="block mb-2">Email</label>
              <input v-model="email" type="email" id="email" required
                class="text-neutral-900 w-full p-2 border border-neutral-900 bg-white outline-none focus:border-neutral-900" />
            </div>
            <div class="form-group mb-6">
              <label for="password" class="block mb-2">Password</label>
              <input v-model="password" type="password" id="password" required
                class="text-neutral-900 w-full p-2 border border-neutral-900 bg-white outline-none focus:border-neutral-900" />
            </div>
            <button type="submit"
              class="text-neutral-900 bg-neutral-50 w-full h-12 flex items-center justify-center border border-neutral-900 transform transition-transform hover:text-black hover:font-bold hover:scale-90">
              Login
            </button>
          </form>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>


<style>
@keyframes peek {

  0%,
  100% {
    transform: translateY(100%);
  }

  50% {
    transform: translateY(0%);
  }
}

@keyframes spinY {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

.spin-3d {
  animation: spinY 2s linear infinite;
  transform-style: preserve-3d;
}
</style>

<style scoped>
.form-wrapper:hover .cat-peek {
  animation: peek 1s ease-in-out infinite;
}

@import 'tailwindcss/tailwind.css';
</style>

