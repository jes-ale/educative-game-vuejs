<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue';
import { usePocketBase } from '~/composables/usePocketBase';
import { EventBus } from '~/event-bus.ts';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const props = defineProps({
  collection: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
});

const { pb } = usePocketBase();
const search = ref('');
const items = ref([]);
const filters = ref([]);
const router = useRouter();

const fetchItems = async () => {
  EventBus.emit('loading', { show: true });
  try {
    const query = buildQuery();
    const records = await pb.collection(props.collection).getFullList({ filter: query });
    items.value = records;
  } catch (error) {
    console.error('Error fetching items:', error);
  } finally {
    EventBus.emit('loading', { show: false });
  }
};

const buildQuery = () => {
  const queryParts = [];

  if (search.value) {
    queryParts.push(
      visibleFields.value.map(field =>
        `${field.field_name} ~ "${search.value}"`
      ).join(' || ')
    );
  }

  filters.value.forEach(filter => {
    if (filter.field && filter.condition && filter.value) {
      switch (filter.condition) {
        case 'equals':
          queryParts.push(`${filter.field} = "${filter.value}"`);
          break;
        case 'contains':
          queryParts.push(`${filter.field} ~ "${filter.value}"`);
          break;
        case 'starts_with':
          queryParts.push(`${filter.field} ~ "^${filter.value}"`);
          break;
        case 'ends_with':
          queryParts.push(`${filter.field} ~ "${filter.value}$"`);
          break;
      }
    }
  });

  return queryParts.length > 0 ? queryParts.join(' && ') : null;
};

const addFilter = () => {
  filters.value.push({ field: '', condition: 'equals', value: '' });
};

const removeFilter = (index) => {
  filters.value.splice(index, 1);
};

const visibleFields = computed(() => props.fields.filter((field) => field.visible));

const route = useRoute();

const navigateToUpdate = (id: string) => {
  const currentPath = route.path.split('/')[1]; // Get the first part of the URL path
  router.push(`/${currentPath}/form/${id}`);
};

onMounted(fetchItems);
</script>

<template>
  <div class="flex w-full h-full justify-start items-center flex-col">
    <div class="flex justify-start items-center w-full">
      <input type="text" v-model="search" @input="fetchItems" placeholder="Search..."
        class="border-x border-black p-2 bg-rose-100 w-full" />
      <button @click="addFilter" class=" p-2 h-full w-auto">
        <Icon icon="fluent:filter-add-20-filled" />
      </button>
      <button @click="fetchItems" class="border-x border-black p-2 h-full w-auto">
        <Icon icon="carbon:query" />
      </button>
    </div>
    <div class="flex flex-col w-full">
      <div v-for="(filter, index) in filters" :key="index" class="flex border-t border-black w-full">
        <select v-model="filter.field" class="border-r border-black p-2 bg-transparent w-full">
          <option disabled value="">Select field</option>
          <option v-for="field in fields" :key="field.id" :value="field.field_name">{{ field.field_name }}</option>
        </select>
        <select v-model="filter.condition" class="border-r border-black p-2 bg-transparent w-full">
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="starts_with">Starts with</option>
          <option value="ends_with">Ends with</option>
        </select>
        <input type="text" v-model="filter.value" class="border-r border-black p-2 bg-rose-100 w-full" />
        <button @click="removeFilter(index)" class="p-2 w-full hover:bg-rose-100">Remove</button>
      </div>
    </div>
    <table class="min-w-full border-collapse">
      <thead>
        <tr>
          <th v-for="field in visibleFields" :key="field.id" class="border border-black p-2 bg-rose-100">
            {{ field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="even:bg-rose-100" @click="navigateToUpdate(item.id)">
          <td v-for="field in visibleFields" :key="field.id" class="border border-black p-2">
            {{ item[field.field_name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>
@import 'tailwindcss/tailwind.css';
/* Add any additional styles */
</style>
