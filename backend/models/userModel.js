import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
        },

        email:{
            type: String,
            required: true,
        },

        password:{
            type: String,
            required: true
        }
    }
);


userSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next)
{
    if(!this.isModified('password'))
    {
        next();
    }
    else
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    
})

const user = mongoose.model('users', userSchema);

export default user;