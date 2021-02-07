import  asyncHandler from 'express-async-handler';
import message from '../models/MessageModel.js';
import messageModel from  '../models/MessageModel.js';
import userModel from '../models/userModel.js';


export const postMessage = asyncHandler ( async(req, res) =>
{
    const { userId, userName, messageContent } = req.body;
    const currentdate = new Date(Date.now());

    const message = new messageModel(
        {
            user: userId,
            content: messageContent,
            date: currentdate, 
            senderName: userName,      
        });

   const createdMessage = await message.save();

   if (createdMessage)
   {
        res.status(201).json(createdMessage);
   }
   else
   {
       res.status(404).json({"error": "Can't post man"});
   }


   
});


export const getMessages = asyncHandler( async(req,res) =>
{
    const messages = await messageModel.find({});

    const messagesJSON = JSON.parse(JSON.stringify(messages));

    const  user = req.query.user ;

    //console.log(user);


    messagesJSON.forEach( async(message) => 
    {
        if(message.user === user)
        {
            message.senderName = "ME";
        }       
    });

    
    res.json(messagesJSON);

});
