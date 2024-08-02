import { Schema, mongoose } from "mongoose";

const PostSchema = new mongoose.Schema({
  postOwnerId: {
    type:"String"
  },
  postOwner: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true },
  tag: { type: String, required: true },
  image: { type: String },
});

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
