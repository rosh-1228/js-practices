#!/usr/bin/env node

const main = () => {
  const monthAndYear = require('minimist')(process.argv.slice(2))
  const date = loadYearMonth(monthAndYear.m, monthAndYear.y)
  console.log(`      ${(date.getMonth() + 1)}月 ${date.getFullYear()}`)
  console.log('日 月 火 水 木 金 土')
  console.log(outputCalendar(date))
}

const loadYearMonth = (month = 0, year = 0) => {
  const date = new Date()
  if (month > 0) date.setMonth(month - 1)
  if (year > 0) date.setFullYear(year)
  return date
}

const createCalendarDays = date => {
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
  const spaces = new Array(firstDate.getDay()).fill('  ')
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const dayNumbers = [...Array(lastDate.getDate()).keys()].map(i => ++i)
  const days = spaces.concat(dayNumbers)
  const calendarDays = days.map(i => ('  ' + i).slice(-2))

  const weeks = []
  for (let firstDay = 0; firstDay < calendarDays.length; firstDay += 7) {
    const week = calendarDays.slice(firstDay, firstDay + 7)
    weeks.push(week)
  }
  return weeks
}

const outputCalendar = (date) => {
  let calendar = ''
  const days = createCalendarDays(date)
  days.forEach(function (item, weeknum) {
    calendar = calendar.concat(days[weeknum].join(' '), '\n')
  })
  return calendar
}

main()

exports.loadYearMonth = loadYearMonth
exports.createCalendarDays = createCalendarDays
exports.outputCalendar = outputCalendar
