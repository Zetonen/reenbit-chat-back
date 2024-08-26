import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hook.js";
import { emailRegexp } from "../schema/user-schema.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "The email is required!"],
      unique: true,
    },
    googleId: {
      type: String,
      required: [true, "The google id is required!"],
    },
    // token: {
    //   type: String,
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
