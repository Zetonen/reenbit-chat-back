import { HttpError, quotableMessage } from "../../helpers/index.js";
import Chat from "../../model/Chat.js";

const addMessage = async (req, res) => {
  const { _id: owner } = req.user;

  const { chatId } = req.params;

  const { message: text, date } = req.body;
  const message = { text, date, isMine: true };
  const newMessage = { text: await quotableMessage(), date, isMine: false };
  const responseMessage = await Chat.findOneAndUpdate(
    { _id: chatId, owner },
    { $push: { message: { $each: [message, newMessage] } } },
    { new: true }
  );
  if (!responseMessage) {
    throw HttpError(404, `Chat with id = ${chatId} is not found`);
  }

  const responseLength = responseMessage.message.length;
  console.log({
    addedMessage: responseMessage.message[responseLength - 2],
    responseMessage: responseMessage.message[responseLength - 1],
  });
  res.json({
    addedMessage: responseMessage.message[responseLength - 2],
    responseMessage: responseMessage.message[responseLength - 1],
  });
  // res.json({ addedMessage, responseMessage });
};
export default addMessage;
