const chai = require('chai')
const assert = chai.assert
const path = require('path')
const Memo = require(path.join(__dirname, '..', 'lib', 'memo'))
const Pencil = require(path.join(__dirname, '..', 'lib', 'pencil'))
require('mocha-sinon')

const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const Eraser = require('../lib/eraser')

const testData = [
  { name: 'testData1', value: 'testData1' },
  { name: 'testData2', value: 'testData2' },
  { name: 'testData3', value: 'testData3' },
  { name: 'testData4', value: 'testData4' },
  { name: 'testData5', value: 'testData5' },
  { name: 'testData6', value: 'testData6' },
  { name: 'testData7', value: 'testData7' },
  { name: 'testData8', value: 'testData8' },
  { name: 'testData9', value: 'testData9' },
  { name: 'testData10', value: 'testData10' }
]

const testWritedData = [
  { name: 'testData1', value: 'testData1' },
  { name: 'testData2', value: 'testData2' },
  { name: 'testData3', value: 'testData3' },
  { name: 'testData4', value: 'testData4' },
  { name: 'testData5', value: 'testData5' },
  { name: 'testData6', value: 'testData6' },
  { name: 'testData7', value: 'testData7' },
  { name: 'testData8', value: 'testData8' },
  { name: 'testData9', value: 'testData9' },
  { name: 'testData10', value: 'testData10' },
  { name: 'testPencilData', value: 'testPencilData' }
]

const testDeletedData = [
  { name: 'testData2', value: 'testData2' },
  { name: 'testData3', value: 'testData3' },
  { name: 'testData4', value: 'testData4' },
  { name: 'testData5', value: 'testData5' },
  { name: 'testData6', value: 'testData6' },
  { name: 'testData7', value: 'testData7' },
  { name: 'testData8', value: 'testData8' },
  { name: 'testData9', value: 'testData9' },
  { name: 'testData10', value: 'testData10' },
  { name: 'testPencilData', value: 'testPencilData' }
]

fs.mkdir(path.join(__dirname, '..', 'db'), (err) => {
  if (err) { throw err }
  fs.chmodSync(path.join(__dirname, '..', 'db'), '777', (err) => {
    if (err) { throw err }
  })
})

const db = new sqlite3.Database(path.join(__dirname, '..', 'db', ':memo:'), (err) => {
  if (err) { throw err }
  fs.chmodSync(path.join(__dirname, '..', 'db', ':memo:'), '777')
})

const loadMemo = () => {
  return new Promise(resolve => {
    const memo = new Memo().load()
    resolve(memo)
  })
}

const writeMemo = (data) => {
  return new Promise(resolve => {
    new Pencil(data).write()
    resolve()
  })
}

before(() => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run('CREATE TABLE memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')
      for (let i = 1; i <= 10; i++) {
        db.run('INSERT INTO memos(content) VALUES (?)', `testData${i}`)
      }
      db.run('SELECT 0', () => {
        resolve()
      })
    })
  })
})

describe('test memo app', () => {
  it('test load memo', async () => {
    const memo = await loadMemo()
    assert.deepEqual(memo, testData)
  })
})

describe('test writed memo', () => {
  before(() => {
    return new Promise((resolve) => {
      new Pencil('testPencilData').write()
      resolve()
    })
  })

  it('test write memo', async () => {
    const memo = await loadMemo()
    assert.deepEqual(memo, testWritedData)
  })
})

describe('test deleted memo', () => {
  before(() => {
    return new Promise((resolve) => {
      new Eraser().delete(1)
      resolve()
    })
  })

  it('test delete memo', async () => {
    let memo = await loadMemo()
    memo = await loadMemo()
    assert.deepEqual(memo, testDeletedData)
  })
})

after(() => {
  db.close()
  process.exit(0)
})
