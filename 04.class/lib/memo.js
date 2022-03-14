#!/usr/bin/env node

const { Select } = require('enquirer')

const main = () => {
  const Pencil = require('./pencil')
  const Eraser = require('./eraser')
  const argv = require('minimist')(process.argv.slice(2))

  const memo = new Memo()

  if ('l' in argv) {
    memo.show()
  } else if ('r' in argv) {
    memo.select()
  } else if ('d' in argv) {
    const eraser = new Eraser()
    eraser.select()
  } else {
    const lines = []
    const reader = require('readline').createInterface({
      input: process.stdin
    })
    reader.on('line', function (line) {
      lines.push(line)
    })
    process.stdin.on('end', function () {
      const pencil = new Pencil(lines.join('\n'))
      pencil.write()
    })
  }
}

class Memo {
  select () {
    this.load().then(contents =>
      (async () => {
        const prompt = new Select({
          type: 'select',
          name: 'memo',
          value: 'memoContent',
          message: 'Choose a note you want to see:',
          choices: contents,
          result (names) {
            return this.map(names)
          }
        })
        prompt.run()
          .then(answer => console.log(Object.values(answer).join()))
      })()
    )
  }

  show () {
    this.load().then(contents => {
      contents.forEach(content => {
        console.log(content.name)
      })
    })
  }

  async load () {
    const sqlite3 = require('sqlite3').verbose()
    const path = require('path')
    const db = new sqlite3.Database(path.join(__dirname, '..', 'db', ':memo:'))

    return new Promise((resolve, reject) => {
      db.all(
        'SELECT content FROM memos',
        [],
        (err, rows) => {
          if (err) {
            reject(err)
          } else {
            const contents = rows.map(row => {
              return { name: row.content.split(/\r\n|\r|\n/)[0], value: row.content }
            })
            resolve(contents)
          }
        }
      )
    })
  }
}

main()

module.exports = Memo
