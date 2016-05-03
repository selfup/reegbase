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

app.get('/', (req, res) => {
  //render JSON as a first step
})

io.sockets.on('connection', socket => {
  socket.on('message', (channel, message) => {
    // Sockets will be implemented here
  })
})

module.exports = app
