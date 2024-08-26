import { HttpError } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const deleteChatById = async (req, res) => {
  const { chatId } = req.params;
  const { _id: owner } = req.user;

  const deletedChat = await Chat.findByIdAndDelete({
    _id: chatId,
    owner,
  });

  if (!deletedChat) {
    throw HttpError(404, `Chat with id = ${chatId} is not found`);
  }
  const response = {
    message: "Chat deleted",
  };

  res.json(response);
};

export default deleteChatById;
