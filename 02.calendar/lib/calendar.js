#!/usr/bin/env node

const weekly = ['日 ', '月 ', '火 ', '水 ', '木 ', '金 ', '土']

let showHeader = () => {
  let header = new Date()
  return '      ' + (header.getMonth() + 1) + '月 ' + header.getFullYear()
}
exports.showHeader = showHeader


let showWeekly = () => {
  return weekly.join('')
}
exports.showWeekly = showWeekly

let calArray = () => {
  let date = new Date()
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  const calArray = Array.from(new Array(date.getDate())).map((v, i) => i + 1)
  return calArray
}
console.log(calArray())

exports.calArray = calArray
