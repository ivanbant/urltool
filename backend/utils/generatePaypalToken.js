import axios from "axios";

async function generatePaypalToken() {
  const { PAYPAL_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;
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
