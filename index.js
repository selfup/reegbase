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
      rejs.newData(`${message[0]}`, message[1])
    }
    if (channel === 'getTable') {
      let table = rejs.getTable(`${message}`)
      io.to(socket.id).emit('sendTable', table)
    }
    if (channel === 'dropTable') {
      rejs.dropTable(`${message}`)
    }
  })
})

module.exports = app
