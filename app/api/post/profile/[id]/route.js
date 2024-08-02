import { connectDB } from "@/app/lib/mongoose";
import { Post } from "@/app/models/Post";
import { NextResponse } from "next/server";

export const GET = async(request, {params}) =>{
    const id = params.id
    try{
        connectDB();
        const posts = await Post.find({
postOwnerId: id})
       return new NextResponse(JSON.stringify(posts), {status:200});
    }catch(err){
        console.error("Database connection error: ",err);
        return new NextResponse("Error in connecting to the database " + err.message, {status:500})
    }
}