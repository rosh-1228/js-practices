class Addition {
  constructor (db) {
    this.db = db
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

  async write () {
    const reader = require('readline').createInterface({
      input: process.stdin
    })
    const words = await this.readMessage(reader)
    this.db.serialize(() => {
      const insertData = this.db.prepare('INSERT INTO memos(content) VALUES (?)')
      insertData.run([words.join('\n')])
      insertData.finalize()
    })
    this.db.close()
  }
}

module.exports = Addition
