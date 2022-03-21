const { Select } = require('enquirer')

class Deletion {
  delete (id) {
    const sqlite3 = require('sqlite3').verbose()
    const path = require('path')
    const db = new sqlite3.Database(path.join(__dirname, '..', 'db', ':memo:'))

    db.serialize(() => {
      const insertData = db.prepare('DELETE FROM memos WHERE id = (?)')
      insertData.run([id])
      insertData.finalize()
    })
    db.close()
  }

  select () {
    this.load().then(contents =>
      (async () => {
        const prompt = new Select({
          type: 'select',
          name: 'memo',
          value: 'memoId',
          message: 'Choose a note you want to delete:',
          choices: contents,
          result (names) {
            return this.map(names)
          }
        })
        prompt.run()
          .then(answer => this.delete(Object.values(answer).join()))
      })()
    )
  }

  async load () {
    const sqlite3 = require('sqlite3').verbose()
    const path = require('path')
    const db = new sqlite3.Database(path.join(__dirname, '..', 'db', ':memo:'))

    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM memos',
        [],
        (err, rows) => {
          if (err) {
            reject(err)
          } else {
            const contents = rows.map(row => {
              return { name: row.content.split(/\r\n|\r|\n/)[0], value: row.id }
            })
            resolve(contents)
          }
        }
      )
    })
  }
}

module.exports = Deletion
