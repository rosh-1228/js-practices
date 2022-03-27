#!/usr/bin/env node

const Viewing = require('./viewing')
const Addition = require('./addition')
const Deletion = require('./deletion')
const argv = require('minimist')(process.argv.slice(2))
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'memo.db'))

class Memo {
  constructor () {
    this.viewing = new Viewing(db)
    this.deletion = new Deletion(db)
    this.addition = new Addition(db)
  }

  async execute () {
    if ('l' in argv) {
      this.viewing.show()
    } else if ('r' in argv) {
      this.viewing.question()
    } else if ('d' in argv) {
      this.deletion.question()
    } else {
      this.addition.write()
    }
  }
}

new Memo().execute()
