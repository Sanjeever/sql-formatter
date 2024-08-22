import type { SqlBaseOptions } from 'prettier-plugin-sql'

export const defaultValue = {
  code: `SELECT a.column1, b.column2, a.column3, c.column4, d.column5 
  FROM table1 a INNER join table2 b ON a.id=b.id 
  LEFT JOIN table3 c ON c.id = a.id 
  RIGHT JOIN table4 d ON d.id = c.id WHERE a.column1 = 'value1' AND b.column2 = 'value2' OR c.column3='value3' GROUP by a.column1, b.column2, c.column4 HAVING COUNT(*) > 1 ORDER BY a.column1 DESC, b.column2 ASC, d.column5 LIMIT 10 OFFSET 5;`,
  options: {
    language: 'mysql',
    keywordCase: 'upper',
    dataTypeCase: 'upper',
    functionCase: 'upper',
    identifierCase: 'preserve',
    indentStyle: 'standard',
    logicalOperatorNewline: 'before',
    expressionWidth: 50,
    database: 'mysql',
  } as SqlBaseOptions,
}
