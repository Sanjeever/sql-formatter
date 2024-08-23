<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'CInput',
})

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: Object as () => any,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, value => emit('update:modelValue', value))
</script>

<template>
  <label class="form-control w-full max-w-xs">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text truncate">
          {{ label }}
        </span>
      </div>
      <input
        v-model="inputValue"
        :type="type"
        class="input input-bordered w-full max-w-xs" />
    </label>
  </label>
</template>
