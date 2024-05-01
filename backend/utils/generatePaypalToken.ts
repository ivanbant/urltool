import axios from "axios";

async function generatePaypalToken() {
  let { PAYPAL_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
  if (!PAYPAL_BASE_URL) throw new Error("PAYPAL_BASE_URL is not defined");
  if (!PAYPAL_CLIENT_ID) throw new Error("PAYPAL_CLIENT_ID is not defined");
  if (!PAYPAL_SECRET) throw new Error("PAYPAL_SECRET is not defined");
  const res = await axios({
    url: PAYPAL_BASE_URL + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_SECRET,
    },
  });
  const data = await res.data;
  return data.access_token;
}

export default generatePaypalToken;
