'use strict'

const http     = require('http')
const socketIo = require('socket.io')
const Selfup   = require('selfup-rejs')
const rejs     = new Selfup
const port     = process.env.PORT || 3000

const server = http.createServer()
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
      if (message[1].message.includes("<")) {
        return
      }
      rejs.newData(`${message[0]}`, message[1])
    }
    if (channel === 'newUser') {
      rejs.newData(`${message[0]}`, message[1])
    }
    if (channel === 'getTable') {
      let foundTable = rejs.getTable(`${message}`)
      io.to(socket.id).emit('foundTable', foundTable);
    }
    if (channel === 'getUser') {
      if (rejs.getTable(`${message.user}`)["1"].token.token === message.token) {
        io.to(socket.id).emit('foundUser', ['valid', socket.id])
      }
    }
    if (channel === 'updateTable') {
      let foundWhere = rejs.updateTable(`${message[0]}`, message[1])
    }
    if (channel === 'dropTable') {
      let foundWhere = rejs.dropTable(message)
    }
  })
})
