<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'CSelect',
})

const props = defineProps({
  options: {
    type: Array as () => string[],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)

watch(selected, value => emit('update:modelValue', value))
</script>

<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text truncate">{{ label }}</span>
    </div>
    <select v-model="selected" class="select select-bordered">
      <option v-for="item in options" :key="item">{{ item }}</option>
    </select>
  </label>
</template>
