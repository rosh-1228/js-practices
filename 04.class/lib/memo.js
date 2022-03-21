#!/usr/bin/env node

const View = require('./view')
const Addition = require('./addition')
const Deletion = require('./deletion')
const argv = require('minimist')(process.argv.slice(2))

class Memo {
  constructor () {
    this.view = new View()
    this.deletion = new Deletion()
  }

  async readMessage (reader) {
    return new Promise(resolve => {
      const messages = []
      reader.on('line', message => {
        messages.push(message)
        resolve(messages)
      })
    })
  }

  async select () {
    if ('l' in argv) {
      this.view.show()
    } else if ('r' in argv) {
      this.view.select()
    } else if ('d' in argv) {
      this.deletion.select()
    } else {
      const reader = require('readline').createInterface({
        input: process.stdin
      })
      const lines = await this.readMessage(reader)
      process.stdin.on('end', function () {
        const addition = new Addition(lines.join('\n'))
        addition.write()
      })
    }
  }
}

new Memo().select()
