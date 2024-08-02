import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
 userId: {type:String},
  role: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
