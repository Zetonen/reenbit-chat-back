import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hook.js";

const messageSchema = new Schema({
  text: {
    type: String,
    required: [true, "The text is required!"],
  },
  date: {
    type: String,
    required: [true, "The date is required!"],
  },
  isMine:{
    type: Boolean,
    required: [true, "The isMine is required!"],
  },
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "The firstName is required!"],
    },
    secondName: {
      type: String,
      required: [true, "The secondName is required!"],
    },
    message: [messageSchema],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

chatSchema.post("save", handleSaveError);
chatSchema.pre("findOneAndUpdate", preUpdate);
chatSchema.post("findOneAndUpdate", handleSaveError);

const Chat = model("chat", chatSchema);
export default Chat;
