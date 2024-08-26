import { HttpError } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const deleteMessageById = async (req, res) => {
  const { chatId: _id, messageId } = req.params;
  const { _id: owner } = req.user;

  const chat = await Chat.findById(_id);
  if (!chat) {
    throw HttpError(404, `Chat with id = ${_id} is not found`);
  }

  const idx = chat.message.findIndex((el) => el._id.toString() === messageId);

  if (idx === -1) {
    throw HttpError(404, `Message with id = ${messageId} is not found`);
  }

  const deleteMessage = chat.message.splice(idx, 1);
  const updateChat = await Chat.findOneAndUpdate({ _id, owner }, chat, {
    new: true,
  });
  res.json({ message: "Chat deleted", updateMessage: deleteMessage[0] });
};
export default deleteMessageById;
