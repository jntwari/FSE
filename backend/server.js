import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server as socketIO} from 'socket.io';
import connectDB from './db.js';
import userRoutes from './routes/userRoute.js';
import messageRoutes from './routes/messageRoute.js';





connectDB();

const app = express();

const IOserver = http.createServer(app);


const io = new socketIO(IOserver, 
    {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials:true,
        }
    });






app.use(express.json());
app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);
app.use("/static", express.static('./static/'))




io.on('connection', (socket) =>
{
    socket.on('message_sent', (userName, messageContent, date) =>
    {
        socket.broadcast.emit('message_received', userName, messageContent, date);
        //socket.emit('message_received');
    })

})



const server = IOserver.listen(5000, () =>
{
console.log("app listening on port 5000");


});
