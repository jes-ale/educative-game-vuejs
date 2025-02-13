<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import TextField from '~/components/Fields/TextField.vue'
import NumberField from '~/components/Fields/NumberField.vue'
import DatetimeField from '~/components/Fields/DatetimeField.vue'
import BooleanField from '~/components/Fields/BooleanField.vue'
import SelectionField from '~/components/Fields/SelectionField.vue'
import Many2ManyField from '~/components/Fields/Many2ManyField.vue'
import Many2OneField from '~/components/Fields/Many2OneField.vue'
import One2ManyField from '~/components/Fields/One2ManyField.vue'
import ActionButton from '~/components/Blocks/ActionButton.vue'
import { Icon } from '@iconify/vue'

const { pb } = usePocketBase()

const props = defineProps({
  title: {
    type: String,
    default: 'Generic Form',
  },
  fields: {
    type: Array,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  collectionName: {
    type: String,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
})

const formData = ref({})

const getFieldComponent = (type) => {
  switch (type) {
    case 'text':
      return TextField
    case 'number':
      return NumberField
    case 'date':
      return DatetimeField
    case 'boolean':
      return BooleanField
    case 'selection':
      return SelectionField
    case 'many2many':
      return Many2ManyField
    case 'many2one':
      return Many2OneField
    case 'one2many':
      return One2ManyField
    default:
      return TextField
  }
}

const handleSubmit = async () => {
  try {
    let response
    if (formData.value.id) {
      response = await pb.collection(props.collectionName).update(formData.value.id, formData.value)
    } else {
      response = await pb.collection(props.collectionName).create(formData.value)
    }
    props.onSubmit(response)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const handleCancel = () => {
  console.log('Cancel clicked')
}

const handlePrint = () => {
  console.log('Print clicked')
}

const isOpen = ref(false)
watch(props, () => {
  console.log('props.initialData', props.initialData)
  formData.value = { ...props.initialData }
});
</script>

<template>
  <div class="relative flex w-full h-full justify-start items-center flex-col">
    <!-- Button area fixed at the top -->
    <div class="left-0 top-0 w-full flex space-x-2 justify-end items-center bg-transparent p-4 z-10 ">
      <h2 class="text-xl">{{ title }}</h2>
      <ActionButton type="submit" icon="mdi:content-save" label="Submit" @click="handleSubmit" />
      <ActionButton type="button" icon="mdi:file-undo" label="Cancel" @click="handleCancel" />
      <ActionButton type="button" icon="mdi:printer" label="Print" @click="handlePrint" />
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="w-16 h-16 flex flex-col items-center justify-center border border-black p-2 bg-rose-700 text-white hover:bg-rose-100 hover:text-rose-700 font-bold">
          <Icon icon="mdi:eye" class="w-full h-full" v-if="open" />
          <Icon icon="mdi:eye-off" class="w-full h-full" v-else />
          <span>{{ open ? 'Hide' : 'Show' }}</span>
        </DisclosureButton>
        <DisclosurePanel>
          <div class="flex space-x-2 transition-transform duration-300 transform"
            :class="{ 'translate-x-0': open, 'translate-x-full': !open }">
            <slot name="buttons" />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <!-- Form content with padding to avoid overlap -->
    <form @submit.prevent="handleSubmit" class="p-4 mb-4 space-y-4 w-full overflow-auto">
      <component v-for="(field, index) in fields" class="w-full" :is="getFieldComponent(field.type)" :key="index"
        v-model="formData[field.name]" :label="field.label" :options="field.options || []" />
    </form>
  </div>
</template>

<style scoped>
/* Add custom styles for fixed button area */
.fixed {
  position: fixed;
}
</style>


<style scoped>
/* Add custom styles for animation */
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
</style>
