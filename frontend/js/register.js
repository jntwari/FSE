
// importing DOMS
const emailDOM = document.getElementById('email');
const fullnameDOM = document.getElementById('name');
const passwordDOM = document.getElementById('password');
const confirmPasswordDOM = document.getElementById('confirm_password');
const registerButtonDOM = document.getElementById('register_button');
const errorDOM = document.getElementById('error_message');


registerButtonDOM.addEventListener('click', async() =>
{
    const email = emailDOM.value;
    const name = fullnameDOM.value;
    const password = passwordDOM.value;
    const confirmPassword = confirmPasswordDOM.value;

    const config ={
        headers: {
            'content-Type' : 'application/json',
        },
    }

    if(password === confirmPassword)
    {
        const createdUser = await axios.post('http://localhost:5000/api/user/register', {name, email, password}, config);

        try
        {
            localStorage.setItem('userInfo', JSON.stringify(createdUser))
            location.replace('./chatroom.html');
        }
        catch(error)
        {
            errorDOM.innerText = "";
            errorDOM.insertAdjacentText('afterbegin', 'User already exist!');
            console.log(error);
        }
    }
    else
    {
        errorDOM.innerText = "";
        errorDOM.insertAdjacentText('afterbegin', 'passwords do not match');

    }
})

