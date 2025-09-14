import { model, Schema } from "mongoose";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/brainly");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, require: true }
});
export const userModel = model("User", UserSchema);
//# sourceMappingURL=db.js.map