import axios from "axios";

const quotableMessage = async () => {
  const response = await axios.get("https://api.quotable.io/random");
  return response.data.content;
};
export default quotableMessage;
