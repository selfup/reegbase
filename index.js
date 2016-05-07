'use strict'

const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const _ = require('lodash')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
const Selfup = require('selfup-rejs')
const rejs = new Selfup

const server = http.createServer(app)
  .listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

const io = socketIo(server)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getTable/:tableName', (req, res) => {
  res.json(rejs.getTable(`${req.params.tableName}`))
})

app.get('/createTable/:tableName', (req, res) => {
  let tableName = req.params.tableName
  rejs.createTable(`${tableName}`)
  res.json({createdTable: tableName})
})

app.get('/dropTable/:tableName', (req, res) => {
  let tableName = req.params.tableName
  rejs.dropTable(`${tableName}`)
  res.json({droppedTable: tableName})
})

app.post('/newData/:tableName', (req, res) => {
  let tableName = req.params.tableName
  rejs.newData(tableName, req.body)
  res.json({status: 201})
})

io.sockets.on('connection', socket => {
  socket.on('message', (channel, message) => {
    // Sockets will be implemented here
  })
})

module.exports = app
