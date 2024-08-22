<script setup lang="ts">
import { defaultValue, formatter } from '@/utils'
import { optionItem } from '@/utils/optionItem'
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
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.database') }}</span>
        </div>
        <select v-model="options.database" class="select select-bordered">
          <option v-for="item in optionItem.database">{{ item }}</option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.dialect') }}</span>
        </div>
        <select
          v-model="(options as any).language"
          class="select select-bordered">
          <option v-for="item in optionItem.language">{{ item }}</option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.keyword') }}</span>
        </div>
        <select v-model="options.keywordCase" class="select select-bordered">
          <option v-for="item in optionItem.keywordCase">{{ item }}</option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.dataType') }}</span>
        </div>
        <select v-model="options.dataTypeCase" class="select select-bordered">
          <option v-for="item in optionItem.dataTypeCase">{{ item }}</option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.func') }}</span>
        </div>
        <select v-model="options.functionCase" class="select select-bordered">
          <option v-for="item in optionItem.functionCase">{{ item }}</option>
        </select>
      </label>
    </div>

    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.identifier') }}</span>
        </div>
        <select v-model="options.identifierCase" class="select select-bordered">
          <option v-for="item in optionItem.identifierCase">{{ item }}</option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.indentStyle') }}</span>
        </div>
        <select v-model="options.indentStyle" class="select select-bordered">
          <option v-for="item in optionItem.indentStyle">{{ item }}</option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.logicalOperator') }}</span>
        </div>
        <select
          v-model="options.logicalOperatorNewline"
          class="select select-bordered">
          <option v-for="item in optionItem.logicalOperatorNewline">
            {{ item }}
          </option>
        </select>
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.expressionWidth') }}</span>
        </div>
        <input
          v-model="options.expressionWidth"
          type="number"
          class="input input-bordered w-full max-w-xs" />
      </label>
    </div>
    <div class="w-1/5 p-4">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">{{ t('message.language') }}</span>
        </div>
        <select v-model="language" class="select select-bordered">
          <option value="zh">{{ t('message.zh') }}</option>
          <option value="en">{{ t('message.en') }}</option>
          <option value="fr">{{ t('message.fr') }}</option>
          <option value="ja">{{ t('message.ja') }}</option>
          <option value="ru">{{ t('message.ru') }}</option>
        </select>
      </label>
    </div>
  </div>

  <!-- Code editing area -->
  <div class="flex w-3/4 h-3/5">
    <div class="w-1/2 p-2">
      <textarea
        v-model="code"
        class="w-full h-full textarea textarea-bordered"></textarea>
    </div>
    <div class="w-1/2">
      <div class="w-full h-full overflow-y-auto">
        <pre><code v-html="highlightedCode" class="language-sql line-numbers"></code></pre>
      </div>
    </div>
  </div>
</template>
