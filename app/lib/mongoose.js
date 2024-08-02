import mongoose from "mongoose"

const connectDB = async () => {
    if(mongoose.connection.readyState >= 1){
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is connected successfully");
    }catch(err){
        console.error("Database connection error", err);
        throw err;
    }
}

export {connectDB}
