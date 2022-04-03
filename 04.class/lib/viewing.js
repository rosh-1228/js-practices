const { Select } = require('enquirer')

class Viewing {
  constructor (db) {
    this.db = db
  }

  question () {
    this.load().then(contents =>
      (() => {
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

  load () {
    return new Promise((resolve, reject) => {
      this.db.all(
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

module.exports = Viewing
