'use strict'

const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const app = express()
const port = process.env.PORT || 3000
const Selfup = require('selfup-rejs')
const rejs = new Selfup

const server = http.createServer(app)
  .listen(port, () => {
  console.log(`Listening on port ${port}.`)
})

const io = socketIo(server)

io.sockets.on('connection', socket => {
  socket.on('message', (channel, message) => {
    if (channel === 'createTable') {
      rejs.createTable(`${message}`)
    }
    if (channel === 'newData') {
      if (message[0].includes("<")) {
        message[0] = "NO SCRIPT TAGS"
      }
      rejs.newData(`${message[0]}`, message[1])
    }
    if (channel === 'getTable') {
      let foundTable = rejs.getTable(`${message}`)
      io.emit('foundTable', foundTable)
    }
    if (channel === 'dropTable') {
      rejs.dropTable(message)
    }
    if (channel === 'findId') {
      let foundId = rejs.findId(`${message[0]}`, `${message[1]}`)
      io.emit('foundId', foundId)
    }
    if (channel === 'deleteById') {
      rejs.deleteById(`${message[0]}`, `${message[1]}`)
    }
    if (channel === 'where') {
      let foundWhere = rejs.where(`${message[0]}`, `${message[1]}`)
      io.emit('foundWhere', foundWhere)
    }
    if (channel === 'updateTable') {
      let foundWhere = rejs.updateTable(`${message[0]}`, message[1])
    }
  })
})

module.exports = app
