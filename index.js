'use strict'

const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const _ = require('lodash')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const selfupRejs = require('selfup-rejs')
const rejs = new selfupRejs

const server = http.createServer(app)
  .listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

const io = socketIo(server)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getTable/:tableName', (req, res) => {
  let   requestArray = req.originalUrl.split('/')
  const tableName    = requestArray[requestArray.length - 1]
  res.json(rejs.getTable(`${tableName}`))
})

app.post('/createTable/:tableName', (req, res) => {
  rejs.createTable('apiTest')
})

app.post('/newData/:tableName', (req, res) => {
  rejs.newData('apiTest')
})

io.sockets.on('connection', socket => {
  socket.on('message', (channel, message) => {
    // Sockets will be implemented here
  })
})

module.exports = app
