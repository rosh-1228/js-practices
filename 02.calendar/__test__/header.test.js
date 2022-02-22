const testCalender = require('../lib/calendar')

test('load today month and year', () =>{
  const date = new Date()
  expect(testCalender.loadYearMonth().getMonth()).toEqual(date.getMonth())
  expect(testCalender.loadYearMonth().getFullYear()).toEqual(date.getFullYear())
})

test('load month is September and today year', () => {
  const date = new Date()
  date.setMonth(9 - 1)
  expect(testCalender.loadYearMonth(9).getMonth()).toEqual(date.getMonth())
  expect(testCalender.loadYearMonth(9).getFullYear()).toEqual(date.getFullYear())
})

test('load today month and year is 2030', () => {
  const date = new Date()
  date.setFullYear(2030)
  expect(testCalender.loadYearMonth(undefined, 2030).getMonth()).toEqual(date.getMonth())
  expect(testCalender.loadYearMonth(undefined, 2030).getFullYear()).toEqual(date.getFullYear())
})

test('load  1970/1', () => {
  const date = new Date()
  date.setMonth(0)
  date.setFullYear(1970)
  expect(testCalender.loadYearMonth(1, 1970).getMonth()).toEqual(date.getMonth())
  expect(testCalender.loadYearMonth(1, 1970).getFullYear()).toEqual(date.getFullYear())
})

test('load  2100/12', () => {
  const date = new Date()
  date.setMonth(11)
  date.setFullYear(2100)
  expect(testCalender.loadYearMonth(12, 2100).getMonth()).toEqual(date.getMonth())
  expect(testCalender.loadYearMonth(12, 2100).getFullYear()).toEqual(date.getFullYear())
})

test('create 2000/12 calendar days array', () => {
  const days = [
    ['  ', '  ', '  ', '  ', '  ', ' 1', ' 2'],
    [' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9'],
    ['10', '11', '12', '13', '14', '15', '16'],
    ['17', '18', '19', '20', '21', '22', '23'],
    ['24', '25', '26', '27', '28', '29', '30'],
    ['31']
  ]
  expect(testCalender.createCalendarDays(testCalender.loadYearMonth(12, 2000))).toEqual(days)
})

test('output 2000/12 calendar', () => {
  const calendarDays = `                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31
`
  expect(testCalender.outputCalendar(testCalender.loadYearMonth(12, 2000))).toEqual(calendarDays)
})
