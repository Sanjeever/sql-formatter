<script setup lang="ts">
import CInput from '@/components/input/index.vue'
import Monaco from '@/components/monaco/index.vue'
import CSelect from '@/components/select/index.vue'
import { defaultValue, formatter, optionItem } from '@/utils'
import { useStorage } from '@vueuse/core'
import type { SqlBaseOptions } from 'prettier-plugin-sql'
import 'prismjs/themes/prism-tomorrow.min.css'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const language = useStorage<string>('sql-formatter-language', 'zh')
const code = useStorage<string>('sql-formatter-code', defaultValue.code)
const options = useStorage<SqlBaseOptions>(
  'sql-formatter-options',
  defaultValue.options
)
const highlightedCode = ref('')

async function render() {
  const formattedCode = await formatter.formatSQL(code.value, options.value)
  highlightedCode.value = formatter.highlightSQL(formattedCode)
}

watch(
  () => code.value,
  async () => await render(),
  { immediate: true }
)

watch(options, async () => await render(), { immediate: true, deep: true })

watch(language, value => (locale.value = value), { immediate: true })
</script>

<template>
  <!-- Configuration Area -->
  <div class="flex flex-wrap w-3/4">
    <!-- Row 1 -->
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.database"
        :label="t('message.database')"
        :options="optionItem.database" />
    </div>
    <div class="w-1/5 p-4">
      <c-select
        v-model="(options as any).language"
        :label="t('message.dialect')"
        :options="optionItem.language" />
    </div>
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.keywordCase"
        :label="t('message.keyword')"
        :options="optionItem.keywordCase" />
    </div>
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.dataTypeCase"
        :label="t('message.dataType')"
        :options="optionItem.dataTypeCase" />
    </div>
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.functionCase"
        :label="t('message.func')"
        :options="optionItem.functionCase" />
    </div>

    <!-- Row 2 -->
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.identifierCase"
        :label="t('message.identifier')"
        :options="optionItem.identifierCase" />
    </div>
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.indentStyle"
        :label="t('message.indentStyle')"
        :options="optionItem.indentStyle" />
    </div>
    <div class="w-1/5 p-4">
      <c-select
        v-model="options.logicalOperatorNewline"
        :label="t('message.logicalOperator')"
        :options="optionItem.logicalOperatorNewline" />
    </div>
    <div class="w-1/5 p-4">
      <c-input
        v-model="options.expressionWidth"
        :label="t('message.expressionWidth')"
        type="number" />
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text truncate">{{ t('message.language') }}</span>
        </div>
        <select v-model="language" class="select select-bordered">
          <option value="zh">{{ t('message.zh') }}</option>
          <option value="en">{{ t('message.en') }}</option>
          <option value="fr">{{ t('message.fr') }}</option>
          <option value="ja">{{ t('message.ja') }}</option>
          <option value="ru">{{ t('message.ru') }}</option>
          <option value="de">{{ t('message.de') }}</option>
        </select>
      </label>
    </div>
  </div>

  <!-- Code editing area -->
  <div class="flex w-3/4 h-3/5">
    <div class="w-1/2 p-2">
      <Monaco v-model="code" />
    </div>
    <div class="w-1/2 p-2">
      <div class="w-full h-full overflow-y-auto">
        <pre><code v-html="highlightedCode" class="language-sql line-numbers"></code></pre>
      </div>
    </div>
  </div>
</template>
