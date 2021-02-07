import userModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';


export const registerUSer = asyncHandler( async(req, res) =>
{

    const{
        name,
        email,
        password    
    } = req.body;

    const userExist = await userModel.findOne({ email });


    if(userExist)
    {
        
        res.status(400).json({"message" : "user exist"});
        throw new Error(`User exist`);
    }


    else
    {
        const user = await userModel.create(
            {
                name, email, password
            }
        );

        if(user)
        {
            res.status(201).json(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                }
            )
        }

        else
        {
            res.status(404);
            throw new Error("Invalid user");
        }
    }
}
);



export const login = asyncHandler( async(req, res) =>
{

    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });
   


   
    if(userExist)
    {
        if( userExist.matchPassword(password) )
        {

            const userInfo = {
                _id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                token: generateToken(userExist._id),
            }


            res.status(201).json(userInfo);


        }
        else
        {
            res.status(404).json({
                message: 'User not found'
            });
            throw new Error("User name and password do not match!");
        }
    }

    else
    {
        res.status(404).json({
            message: 'User not found'
        });
        throw new Error(`User name and password do not match! ${email}`);
    }
});

export const logout = () =>
{
    const userInfo = localStorage.getItem("userInfo");
    
    if(userInfo) 
    {
        localStorage.removeItem("userInfo");
    }
}