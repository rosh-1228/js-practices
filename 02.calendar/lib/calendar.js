#!/usr/bin/env node

let showHeader = () => {
  let header = new Date()
  return '      ' + (header.getMonth() + 1) + '月 ' + header.getFullYear()
}
module.exports = showHeader
