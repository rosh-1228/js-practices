const testCalender = require('../lib/calendar')

test('load this month this year', () => {
  expect(testCalender.showHeader()).toBe('      2月 2022')
})

test('load weekly', () => {
  expect(testCalender.showWeekly()).toBe('日 月 火 水 木 金 土')
})
