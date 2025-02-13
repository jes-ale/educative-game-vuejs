import { ref } from 'vue'
import PocketBase from 'pocketbase'
import { EventBus } from '~/event-bus.ts';


const pb = new PocketBase('https://db.alejos.dev')

const isLoggedIn = ref(false)
const user = ref<any>(null)

export const usePocketBase = () => {
  const start = async () => {

    if (process.client) {
      function getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

      function setCookie(name: any, value: any, days: any) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
        const sameSite = 'SameSite=Lax;'; // Adjust SameSite attribute as needed
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; ${secure} ${sameSite}`;
      }

      function deleteCookie(name: any) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }

      const storedAuth = getCookie('pb_auth');

      if (storedAuth) {
        EventBus.emit('loading', { show: true });
        try {
          const authData = JSON.parse(decodeURIComponent(storedAuth));
          pb.authStore.loadFromCookie(authData);
          if (pb.authStore.isValid) {
            isLoggedIn.value = true
            await pb.collection('internal_users').authRefresh();
            user.value = pb.authStore.model
          }
        } catch (e) {
          console.error('Failed to parse storedAuth:', e);
        } finally {
          EventBus.emit('loading', { show: false });
        }
      }
      pb.authStore.onChange(() => {
        const authData = JSON.stringify(pb.authStore.exportToCookie());
        setCookie('pb_auth', authData, 7);
      });
    }
  }
  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('internal_users').authWithPassword(email, password)
      isLoggedIn.value = true
      user.value = authData.record
    } catch (error) {
      isLoggedIn.value = false
      user.value = null
      throw error
    }
  }

  const logout = async () => {
    pb.authStore.clear()
    isLoggedIn.value = false
    user.value = null
  }

  return {
    isLoggedIn,
    user,
    login,
    logout,
    pb,
    start
  }
}

