import type { SqlBaseOptions } from 'prettier-plugin-sql'
import PrettierPluginSql from 'prettier-plugin-sql'
import { format } from 'prettier/standalone'
import Prism from 'prismjs'

const formatter = {
  async formatSQL(sql: string, options: SqlBaseOptions) {
    return await format(sql, {
      parser: 'sql',
      plugins: [PrettierPluginSql],
      ...options,
    })
  },
  highlightSQL(sql: string): string {
    return Prism.highlight(sql, Prism.languages.sql, 'sql')
  },
}

export { formatter }
