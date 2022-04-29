require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { PeerServer } = require('peer')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  SocketServer(socket)
})

// Create peer server
PeerServer({ port: 3001, path: '/' })

// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))

const URI = process.env.MONGODB_URL
mongoose.connect(URI, null, err => {
  if (err) throw err
  console.log('Connected to mongodb')
})

const port = process.env.PORT || 5000
http.listen(port, () => console.log('Server is running on port', port))

// MERN Stack - Build a social media app (instagram , facebook, twitter clone) - #43 End Call | 10:03 / 35:10
