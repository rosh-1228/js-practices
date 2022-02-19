const calHeader = require('../lib/calendar')

test('load this month this year', () => {
  expect(showHeader()).toBe('      2月 2022')
})
