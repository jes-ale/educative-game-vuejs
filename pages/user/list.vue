<script setup>
import ListView from '~/components/Views/ListView.vue';
import Header from '~/components/Blocks/Header.vue';
import { Icon } from '@iconify/vue'
const { t } = useI18n()

const collection = 'internal_users';
const fields = [
  { field_name: 'username', visible: true, readonly: false, id: 'username' },
  { field_name: 'verified', visible: true, readonly: false, id: 'verified' },
  { field_name: 'email', visible: true, readonly: false, id: 'email' },
  { field_name: 'created', visible: true, readonly: true, id: 'created' },
  { field_name: 'updated', visible: true, readonly: true, id: 'updated' },
  { field_name: 'avatar', visible: true, readonly: false, id: 'avatar' },
  { field_name: 'roles', visible: true, readonly: false, id: 'roles' },
  { field_name: 'contact_fk', visible: true, readonly: false, id: 'contact_fk' },
  { field_name: 'company_id', visible: true, readonly: false, id: 'company_id' }
];
</script>
<template>
  <div>
    <NuxtLayout name="default">
      <div class="w-full h-full flex items-center justify-center">
        <ListView :collection="collection" :fields="fields" />
      </div>
    </NuxtLayout>
  </div>
</template>
