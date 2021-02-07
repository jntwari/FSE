import jwt from 'jsonwebtoken';



const generateToken = (id) =>
{
    return jwt.sign( {id}, "qwerty123", {
        expiresIn: '20d',
    })
}

export default generateToken;