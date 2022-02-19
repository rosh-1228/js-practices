const testCalender = require('../lib/calendar')

test('load this month this year', () => {
  expect(testCalender.showHeader()).toBe('      2月 2022')
})

test('load weekly', () => {
  expect(testCalender.showWeekly()).toBe('日 月 火 水 木 金 土')
})

test('current year and month', () => {
  let date = new Date()
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  const calArray = Array.from(new Array(date.getDate())).map((v, i) => i + 1)
  expect(testCalender.calArray).toBe(calArray)
})
