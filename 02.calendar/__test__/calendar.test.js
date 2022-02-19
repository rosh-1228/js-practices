const calHeader = require('../lib/calendar')

test('load this month this year', () => {
  expect(showHeader()).toBe('      2月 2022')
})

const weekly = require('../lib/calendar')

test('load weekly', () => {
  expect(showWeekly()).toBe(['日 月 火 水 木 金 土')
})
