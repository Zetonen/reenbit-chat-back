import axios from "axios";

const quotableMessage = async () => {
  const response = await axios.get(
    "https://api.api-ninjas.com/v1/quotes?category=happiness",
    { headers: { "X-Api-Key": "SHWK6NBkhvTAJOrbBWMJqA==XK7994WvQ8Ydy8UC" } }
  );
  console.log(response);
  // const response = await axios.get("https://api.quotable.io/random");
  // return response.data.content;
  return response.data[0].quote;
};
export default quotableMessage;
