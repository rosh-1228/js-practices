#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose()

const path = require('path')
const fs = require('fs')
fs.mkdir(path.join('db'), (err) => {
  if (err) { throw err }
  fs.chmodSync(path.join('db'), '777', (err) => {
    if (err) { throw err }
  })
})

const db = new sqlite3.Database('./db/:memo:')
db.run('CREATE TABLE memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')

db.close()
