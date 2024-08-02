import { connectDB } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
export const POST = async(request) =>{
    if(request.method == "POST"){
        const {username,  password, email} = await request.json();
        await connectDB();

        if(!username || !password){
            return new NextResponse("Please provide a username and password", {status:400});
        }

        try{
            // Check if the user already exists;
            const existUser = await User.findOne({username});
            if(existUser){
                return new NextResponse("User already exist", {status:400});
            }

            //hashing password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Creating a new User;
            await User.create({username: username, email:email, password: hashedPassword, });

            return new NextResponse("User is created succesfully", {status:200});
        }catch(err){
            return new NextResponse(err.message, {status:500});
        }
    }else{
        return new NextResponse("Method is not allowed", {status:405});
    }
}