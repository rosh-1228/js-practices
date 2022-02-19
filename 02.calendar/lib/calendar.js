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
