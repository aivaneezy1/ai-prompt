import { connectDB } from "@/app/lib/mongoose";
import { Post } from "@/app/models/Post";
import { NextResponse } from "next/server";



export const GET = async(request) =>{
    try{
        connectDB();
        const posts = await Post.find();
        return new NextResponse(JSON.stringify(posts), {status:200});
    }catch(err){
        console.error("Database connection error: ", err);
        return new NextResponse("Error in connecting to the database" + err.message, {status:500});
    }
}

export const POST = async(request) =>{
    if(request.method == "POST"){
        const { postOwnerId, postOwner, body, tag, image, email} = await request.json();
      
        await connectDB();

        if(!body || !tag){
            return new NextResponse("Provide a body and a tag", {status:400});
        }

        try{
            await Post.create({ 
                postOwnerId:postOwnerId,
                postOwner: postOwner, 
                email: email,
                body: body, 
                tag: tag,
                image:image });

            return new NextResponse("Post is created succesfully");
        }catch(err){
            return new NextResponse(err.message, {status:500});
        }
    }else{
        return new NextResponse("Method is not allowed", {status:405});
    }
}


