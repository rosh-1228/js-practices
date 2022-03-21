class Addition {
  constructor (words) {
    this.words = words
  }

  write () {
    const sqlite3 = require('sqlite3').verbose()
    const path = require('path')
    const db = new sqlite3.Database(path.join(__dirname, '..', 'db', ':memo:'))

    db.serialize(() => {
      const insertData = db.prepare('INSERT INTO memos(content) VALUES (?)')
      insertData.run([this.words])
      insertData.finalize()
    })
    db.close()
  }
}

module.exports = Addition
