let sandbox = require('@architect/sandbox')
let data = require('@begin/data')
let tiny = require('tiny-json-http')
let test = require('ava')

// start and end sandbox to execute tests
test.before(async () => {
  await sandbox.start({ quiet: true, })
})

test.after(async () => {
  await sandbox.end()
})

// check for a response.body on GET request to / 
test('get /', async t => {
  let url = 'http://localhost:3333'
  let result = await tiny.get({url})
  t.true(!!result.body)
})

test('@begin/data', async t => {
  // tests that @begin/data can write data
  let tmp = await data.set({table: 'tmp'})
  t.is(tmp.table, 'tmp')

  // tests that @begin/data can read data
  let result = await data.get({table: 'tmp'})
  t.is(result.length, 1)
  console.log(result)
})
