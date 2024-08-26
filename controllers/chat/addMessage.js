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
  // console.log(newMessage);
  // const responseMessage = await Chat.findOneAndUpdate(
  //   { _id: chatId, owner },
  //   { $push: { newMessage } },
  //   { new: true }
  // );
  console.log({
    addedMessage: responseMessage.message[0],
    responseMessage: responseMessage.message[1],
  });
  res.json({
    addedMessage: responseMessage.message[0],
    responseMessage: responseMessage.message[1],
  });
  // res.json({ addedMessage, responseMessage });
};
export default addMessage;
