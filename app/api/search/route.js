import { connectDB } from "@/app/lib/mongoose";
import { Post } from "@/app/models/Post";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  if (!search) {
    return new NextResponse("Missing a query parameter", { status: 400 });
  }
  await connectDB();
  try {
    const posts = await Post.find({
      $or: [
        {postOwner: {$regex: search, $options: "i"}},
        {email:{$regex:search, $options: "i"}},
        { body: { $regex: search, $options: "i" } },
        { tag: { $regex: search, $options: "i" } },
      ],
    });
     console.log("Search parameter:", search);
     return new NextResponse(JSON.stringify(posts), { status: 200,});
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }


};
