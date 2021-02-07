
// DOMS

const loginButton = document.getElementById('login_button');
const emailDOM = document.getElementById('email');
const passwordDOM = document.getElementById('password');
const errorMessageDOM = document.querySelector('.error_message');
const mainDiv = document.querySelector('.main_div');
const logoutButton = document.getElementById('logout');



// DOM manipulators
const clearComponent = (DOM) =>
{
    DOM.innerHTML = "";
}









// API manipulators
const loginHandler = async(email, password) =>
{
    //console.log("clicked");
    //const email = emailDOM.value;
    //const password = passwordDOM.value;

    const config ={
        headers: {
            'content-Type' : 'application/json',
        },
    }

    console.log(` email is ${email} and password is ${password}`);  

    try
    {
        const  userInfo  = await axios.post('http://localhost:5000/api/user/login',
                         {email: email, password: password }, config);
        
        if(userInfo.status === 201)
        {
            console.log(userInfo.data._id);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            location.replace("./chatroom.html");
            //clearComponent(mainDiv);
        }
        else
        {
            console.log(error)
        }
    }
    catch(error)
    {
        errorMessageDOM.innerHTML = "";
        errorMessageDOM.insertAdjacentHTML('afterbegin', `
        <h5 class='text-danger'> User name or password do match! </h5>
        `);
        //console.log(error);
    }
}










// Event listeners

// Login
loginButton.addEventListener('click', async() => 
{
    const email = emailDOM.value;
    const password = passwordDOM.value;

   await loginHandler(email, password);
})














