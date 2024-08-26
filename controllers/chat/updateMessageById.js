import { HttpError } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const updateMessageById = async (req, res) => {
  const { chatId: _id, messageId } = req.params;
  const { _id: owner } = req.user;
  const chat = await Chat.findById(_id);

  if (!chat) {
    throw HttpError(404, `Chat with id = ${_id} is not found`);
  }
  //   if (chat.owner.toString() !== owner.toString()) {
  //     throw HttpError(401, "Not enough rights");
  //   }

  const { message } = req.body;
  const idx = chat.message.findIndex((el) => el._id.toString() === messageId);

  if (idx === -1) {
    throw HttpError(404, `Message with id = ${messageId} is not found`);
  }
  if (!chat.message[idx].isMine) {
    throw HttpError(403, `You not have rights to edit this message`);
  }
  chat.message[idx].text = message;
  const updateChat = await Chat.findOneAndUpdate({ _id, owner }, chat, {
    new: true,
  });

  res.json({ updateMessage: updateChat.message[idx] });
};
export default updateMessageById;
