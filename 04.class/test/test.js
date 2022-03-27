#!/usr/bin/env node
/* eslint-env node, mocha */

const assert = require('chai').assert
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'memo.db'))
const testData = [
  { name: 'testData1', value: 'testData1' }
]
const Viewing = require(path.join(__dirname, '..', 'lib', 'viewing'))
const Addition = require(path.join(__dirname, '..', 'lib', 'addition'))
const Deletion = require(path.join(__dirname, '..', 'lib', 'deletion'))
const addition = new Addition(db)

const loadMemo = async () => {
  const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'memo.db'))
  const viewing = new Viewing(db)
  const memo = await viewing.load()
  return memo
}

const addMemo = () => {
  return new Promise(resolve => {
    addition.write()
    resolve()
  })
}

const deleteMemo = (id) => {
  return new Promise(resolve => {
    const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'memo.db'))
    new Deletion(db).delete(id)
    resolve()
  })
}

const loadLastData = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'memo.db'))
    db.all('SELECT id FROM memos ORDER BY id DESC LIMIT 1', (err, resultid) => {
      if (err) {
        reject(err)
      } else {
        resolve(resultid)
      }
    })
  })
}

before(async () => {
  await addMemo()
})

describe('test write memo', () => {
  it('test write memo', async () => {
    const memo = await loadMemo()
    assert.deepEqual(memo, testData)
  })
})

describe('test delete memo', () => {
  before(async () => {
    const result = await loadLastData()
    await deleteMemo(result[0].id)
  })

  it('test delete memo', async () => {
    let memo = await loadMemo()
    memo = await loadMemo() // 最初のloadMemoより後にdeleteMemoが実行されるため、2回loadMemoを実行
    assert.deepEqual(memo, [])
  })
})
