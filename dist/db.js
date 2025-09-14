import { model, Schema } from "mongoose";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/brainly");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});
export const userModel = model("User", UserSchema);
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
});
export const ContentModel = model("content", ContentSchema);
//# sourceMappingURL=db.js.map