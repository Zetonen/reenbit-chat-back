import { HttpError } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const updateChatById = async (req, res) => {
  const { chatId } = req.params;
  const { _id: owner } = req.user;
  const chat = { ...req.body };

  const updateChat = await Chat.findOneAndUpdate({ _id: chatId, owner }, chat, {
    new: true,
  });
  if (!updateChat) {
    throw HttpError(404, `Chat with id = ${chatId} is not found`);
  }

  res.json({
    updateChat: {
      id: updateChat._id,
      firstName: updateChat.firstName,
      secondName: updateChat.secondName,
    },
  });
};

export default updateChatById;
