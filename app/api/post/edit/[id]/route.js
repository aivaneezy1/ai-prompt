import { connectDB } from "@/app/lib/mongoose";
import { Post } from "@/app/models/Post";
import { NextResponse } from "next/server";

export const GET = async(request, {params}) =>{
    const id = params.id
    try{
        connectDB();
        const posts = await Post.findOne({
_id:id})
       return new NextResponse(JSON.stringify(posts), {status:200});
    }catch(err){
        console.error("Database connection error: ",err);
        return new NextResponse("Error in connecting to the database " + err.message, {status:500})
    }
}



export const PATCH = async (request, {params}) => {
  const id = params.id
  if (request.method == "PATCH") {
    const { body, tag } = await request.json();

    await connectDB();

    if (!body || !tag) {
      return new NextResponse("Provide a body and a tag", { status: 400 });
    }

    try{
        const updatedPost = await Post.findByIdAndUpdate(id, { body, tag }, { new: true });
         return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
    }catch(err){
        return new NextResponse(err.message, {status:500})
    }
  }else {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }
};
