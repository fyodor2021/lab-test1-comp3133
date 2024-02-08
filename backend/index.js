const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes.js')
const socketIO = require('socket.io')
const cors = require('cors')
const app = express();
const chatModel = require('./models/Chat.js');

app.use(express.json())
app.use(cors());
app.use(userRoutes)

const DB_HOST = "cluster0.ahnfv68.mongodb.net"
const DB_USER = "vedoorbbs"
const DB_PASSWORD = "kNKXWYEupar28ZPH"
const DB_NAME = "lab-test1"

const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});
const backendServer = app.listen(8079, () => {
    console.log('server is running...')
})

const serverIO = socketIO(backendServer,{
    cors: '*'
})
serverIO.on('connection', socket => {

    socket.on('send-message', (chat) => {
        if(chat.room){
            const chatObj = new chatModel({
                fromuser: socket.id,
                room: chat.room,
                message: chat.content,
            });
            chatObj.save();
            socket.to(chat.room).emit("receive-message", chat)
        }
        // }else{
        //     socket.broadcast.emit("receive-message", chat)
        // }
    })
    socket.on('join-room', (room) => {
        socket.join(room)
    })
    socket.on('leave-room', (room) => {
        socket.leave(room)
    })
    socket.on('typing', user => {
        socket.broadcast.emit('user-typing', user)
    })
    socket.on('stop-typing', user => {
        socket.broadcast.emit('stop-typing', user)
    })
    socket.on('sent-to-person', details => {
        socket.to(details.to).emit("receive-message", details)
    })
})  
