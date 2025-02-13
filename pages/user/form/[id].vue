<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormView from '~/components/Views/FormView.vue';
import Header from '~/components/Blocks/Header.vue';
import ActionButton from '~/components/Blocks/ActionButton.vue';
import { usePocketBase } from '~/composables/usePocketBase'; // Assuming this is where you import PocketBase
import { EventBus } from '~/event-bus.ts'; // Assuming this is your event bus setup

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
})


interface Field {
  name: string;
  label: string;
  type: string;
  options?: string[];
  readonly?: boolean;
}

const fields: Field[] = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'verified', label: 'Verified', type: 'boolean' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'created', label: 'Created', type: 'date', readonly: true },
  { name: 'updated', label: 'Updated', type: 'date', readonly: true },
  { name: 'avatar', label: 'Avatar', type: 'text' },
  { name: 'roles', label: 'Roles', type: 'selection', options: ['admin', 'user', 'guest'] },
  { name: 'contact_fk', label: 'Contact', type: 'many2one' },
  { name: 'company_id', label: 'Company', type: 'many2one' },
];

const initialData = ref<Record<string, any>>();
const route = useRoute();
const router = useRouter();
const userId = computed(() => route.params.id as string | undefined);

const formTitle = computed(() => (userId.value ? 'Update User' : 'Create User'));

const { pb } = usePocketBase(); // Initialize your PocketBase instance

const fetchUserData = async () => {
  try {
    if (userId.value) {
      EventBus.emit('loading', { show: true }); // Trigger global loading indicator
      const user = await pb.collection('internal_users').getOne(userId.value);
      console.log('user', user);
      initialData.value = user;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  } finally {
    EventBus.emit('loading', { show: false }); // Hide global loading indicator
  }
};

onMounted(() => {
  fetchUserData();
});

const handleFormSubmit = async (formData: Record<string, any>) => {
  try {
    if (userId.value) {
      EventBus.emit('loading', { show: true }); // Trigger global loading indicator
      await pb.collection('internal_users').update(userId.value, formData);
    } else {
      EventBus.emit('loading', { show: true }); // Trigger global loading indicator
      await pb.collection('internal_users').create(formData);
    }
    router.push('/user/list'); // Redirect to user list or appropriate page
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    EventBus.emit('loading', { show: false }); // Hide global loading indicator
  }
};

const handleCancel = () => {
  console.log('Cancel clicked');
  router.back(); // Navigate back to the previous page
};
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div class="w-full h-full flex items-center justify-center">
        <FormView :title="formTitle" :fields="fields" :initialData="initialData" collectionName="internal_users"
          @submit="handleFormSubmit">
          <template #buttons>
            <ActionButton type="button" icon="fluent:password-reset-48-filled" label="Psswd" @click="handleCancel" />
            <ActionButton type="button" icon="mdi:cloud-refresh" label="Fetch" @click="fetchUserData" />
          </template>
        </FormView>
      </div>
    </NuxtLayout>
  </div>
</template>


<style scoped></style>
