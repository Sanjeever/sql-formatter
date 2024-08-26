<script lang="ts" setup>
import { templateRef } from '@vueuse/core'
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'Monaco',
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
const el = templateRef<HTMLElement>('el')
const content = ref(props.modelValue)

watch(
  () => props.modelValue,
  value => {
    if (content.value !== value) {
      content.value = value
    }
  }
)

onMounted(() => {
  const editor = monaco.editor.create(el.value, {
    value: content.value,
    language: 'sql',
    theme: 'vs-dark',
    wordWrap: 'on',
    minimap: {
      enabled: false,
    },
  })

  editor.onDidChangeModelContent(() => {
    const value = editor.getValue()
    if (value !== content.value) {
      emit('update:modelValue', value)
    }
  })
})
</script>

<template>
  <div ref="el" class="w-full h-full"></div>
</template>
