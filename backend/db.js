import mongoose from 'mongoose';

const dbLink = "mongodb+srv://bocog:bocog123@cluster0.tjmq1.mongodb.net/chartroom?retryWrites=true&w=majority";

const connectDB = async() =>
{
    try
    {
       const conn = await mongoose.connect(dbLink,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
    
        console.log(`Database connected: ${conn.connection.host}`);
    }

    catch(error)
    {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;
