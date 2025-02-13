<script setup>
import { Icon } from '@iconify/vue'
import { usePocketBase } from '@/composables/usePocketBase';
import Avatar from '~/components/Blocks/Avatar.vue';
import Breadcrumb from '~/components/Blocks/Breadcrumb.vue';
import InternalUsers from '~/components/Blocks/InternalUsers.vue';
import { EventBus } from '~/event-bus.ts';

const { pb, user, isLoggedIn, logout } = usePocketBase();
const isMenuOpen = ref(false);
const searchQuery = ref('');

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

const avatar = ref("")
const roles = ref("")

const router = useRouter()
const goback = () => {
    router.back()
};

watch(user, async () => {
    try {
        if (isLoggedIn && user.value) {
            EventBus.emit('loading', { show: true });
            const record = await pb.collection(user?.value.collectionName).getOne(user.value.id, {
                expand: 'roles',
                requestKey: "header_watch_auth",
            });
            let url = pb.files.getUrl(record, record.avatar);
            avatar.value = url
            let arrayRoles = []
            for (let id of record.roles) {
                const rol = await pb.collection('roles').getOne(id)
                arrayRoles.push(rol.name)
            }
            roles.value = arrayRoles.join(', ')
        }
    } catch (e) {
        console.error(e)
    } finally {
        EventBus.emit('loading', { show: false });
    }
})
</script>

<template>
    <header
        class="shadow-lg form-wrapper bg-opacity-25 bg-white py-2 px-4 border-b border-black flex items-center justify-between w-full h-20">
        <!-- User Information -->
        <div class="flex items-center space-x-2">
            <button @click="goback"
                class="p-2 h-full w-auto flex space-x-1 items-center justify-between border border-black hover:bg-rose-100">
                <Icon icon="carbon:caret-left" class="" />
            </button>
        </div>
        <!-- Breadcrumb -->
        <div class="flex w-full">
            <Breadcrumb />
        </div>

        <!-- Account Actions Menu -->
        <div class="flex items-center space-x-2 justify-end w-full">
            <div class="">
                <span class="text-lg font-bold block">{{ user?.username }}</span>
                <span class="text-sm font-light block">{{ roles }}</span>
            </div>

            <div class="relative">
                <img :src="avatar" class="w-16 h-16 rounded-full shadow-md border border-neutral-900 cursor-pointer"
                    @click="toggleMenu" />
                <div v-show="isMenuOpen" @click="toggleMenu"
                    class="origin-top-right absolute right-0 mt-0 w-48 shadow-lg bg-rose-100 ring-1 ring-black ring-opacity-5 divide-y divide-black border border-black"
                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <div class="py-1" role="none">
                        <a href="#" class="block px-4 py-2 text-sm text-neutral-900 hover:bg-rose-100"
                            role="menuitem">Profile</a>
                        <a href="#" class="block px-4 py-2 text-sm text-neutral-900 hover:bg-rose-100"
                            role="menuitem">Settings</a>
                        <a href="#" @click="logout" class="block px-4 py-2 text-sm text-neutral-900 hover:bg-rose-100"
                            role="menuitem">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Additional Tailwind classes or custom styles can be added here */
</style>
