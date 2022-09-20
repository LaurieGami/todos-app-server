import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    token: String,
},
    { timestamps: true }
);

const User = model("User", userSchema);

export default User;
