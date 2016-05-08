'use strict'

const http       = require('http')
const express    = require('express')
const _          = require('lodash')
const app        = express()
const bodyParser = require('body-parser')
const port       = process.env.PORT || 3000
const Selfup     = require('selfup-rejs')
const rejs       = new Selfup
const cors = require('express-cors');
app.use(cors({ allowedOrigins: ['*'] }));

app.use(bodyParser.urlencoded({ extended: true }))

const server = http.createServer(app)
  .listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

app.get('/getTable/:tableName', (req, res, next) => {
  res.json(rejs.getTable(`${req.params.tableName}`))
})

app.get('/createTable/:tableName', (req, res, next) => {
  let tableName = req.params.tableName
  rejs.createTable(`${tableName}`)
  res.json({createdTable: tableName})
})

app.get('/dropTable/:tableName', (req, res, next) => {
  let tableName = req.params.tableName
  rejs.dropTable(`${tableName}`)
  res.json({droppedTable: tableName})
})

app.get('/newData/:tableName/:data', (req, res, next) => {
  let tableName = req.params.tableName
  let data      = req.params.data
  rejs.newData(tableName, data)
  res.json({status: 201})
})

module.exports = app
