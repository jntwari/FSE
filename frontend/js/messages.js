const socket = io('http://localhost:5000');

// DOMS 
const logoutDOM = document.getElementById('logout');
const messageContainer = document.querySelector('.message_container');
const sendMessageBUtton = document.getElementById('send_message');
const messageBox = document.getElementById('messageContent');
const userInfoDOM = document.querySelector('.user-info');


// global variables
const userInfo = JSON.parse(localStorage.getItem('userInfo'));


// DOM functions
if(userInfo)
{
    userInfoDOM.insertAdjacentText( 'beforeEnd', userInfo.data.name)
}

const addMessageDOM = (senderName,content,date) =>
{
    return(`
        <div class="card" style="width: 40rem; margin-left: 6.5rem; margin-top: 5px; max-height:8rem">
            <div class="card-body">
            <h5 class="card-title">${senderName}:</h5>
            <p class="card-text">${content}</p>
            <p class="text-right">${moment(date).format('MM/DD/YYYY-HH:mm')}</p>
            </div>
        </div>
    `)
}

const addMessageBody = (messages, DOM) =>
{
    let messageBody = '';

    messages.forEach( message => messageBody += addMessageDOM(message.senderName, message.content, message.date)); 
    DOM.innerHTML = '';
    DOM.insertAdjacentHTML('afterbegin', messageBody);
}






// API functions
const getMessages =  async() =>
{
    const config ={
        headers: {
            'content-Type' : 'application/json',
        },
    }
    
    
    const user = userInfo.data._id;


   const messages = await axios.get('http://localhost:5000/api/messages', {params:{user: user}}, config);

   return messages.data;
}





/// Listeners
sendMessageBUtton.addEventListener('click', async() =>
{
    const config ={
        headers: {
            'content-Type' : 'application/json',
        },
    }

    
    const userId = userInfo.data._id;
    const userName = userInfo.data.name;



    if(messageBox.value !== "")
    {
        const messageContent = messageBox.value;
        const date = new Date(Date.now());

        const message = await axios.post('http://localhost:5000/api/messages', { userId, userName,  messageContent}, config);

        if(message)
        {
            messageBox.value = "";
            socket.emit('message_sent', userName, messageContent, date);
    
            const messageDOM = addMessageDOM('ME', messageContent, date);
            messageContainer.insertAdjacentHTML('beforeend', messageDOM);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }

    } 

    else
    {
        ///
    }
})


// Logout event listener

logoutDOM.addEventListener('click', () =>
{
    localStorage.removeItem('userInfo');
    location.replace('./index.html');
})


// socket listener

socket.on('message_received', (userName, messageContent, date) =>
{
    const messageDOM = addMessageDOM(userName, messageContent, date);
    messageContainer.insertAdjacentHTML('beforeend', messageDOM);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
);



//Setting message chat 

const setMessagePage = async () =>
{
    const userInfo = localStorage.getItem("userInfo");


    if (userInfo)
    {
        const messages = await getMessages();
        addMessageBody(messages, messageContainer);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    else
    {
        location.replace('./index.html');
    }
    
} 


setMessagePage();