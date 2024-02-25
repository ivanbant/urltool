import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../services/UserContext";
import { useNavigate } from "react-router-dom";

const CheckoutScreen = () => {
  const { user } = useContext(UserContext);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [tier, setTier] = useState("pro");

  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.isUnreg) {
      navigate("/login?return_to=checkout");
    }
  }, [user]);

  useEffect(() => {
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId:
            "ASZDFXiHVLEDDEZUd-IlnHQBbQJjHmFU6DYLHM_mRO0qybLz-cwgOOG4TrPluGb8mm5ErvKAYWfxtDrN",
          components: "buttons",
          intent: "subscription",
          vault: true,
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    if (!window.paypal) {
      loadPaypalScript();
    }
  }, []);

  const changeTierHandler = (e) => {
    setTier(e.target.value);
  };

  const onApprove = (data, actions) => {
    return actions.subscription.get().then(async function (details) {
      const subscriptionId = details.id;
      const res = await axios.post(
        "http://localhost:5000/api/paypal/subscription/create",
        {
          subscriptionId,
        },
        { withCredentials: true }
      );
      console.log(res);
    });
  };
  const onError = (err) => {
    console.log(err);
  };
  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-07796694LN748203FMUQC5CY",
    });
  };

  return (
    <div className=" container py-16 w-full min-h-screen  mx-auto">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="w-full  flex justify-center ">
        <div className="w-3/4">
          <div onChange={changeTierHandler} className="flex flex-col space-y-2">
            <input type="radio" value="pro" name="tier" defaultChecked /> Pro
            <input type="radio" value="enterprise" name="tier" /> Enterprise
          </div>
        </div>
        <div className="p-6 shadow-lg flex flex-col w-1/4 h-fit">
          <div className="flex flex-col justify-center mt-6">
            <h1 className="text-xl font-semibold">Order Summary</h1>

            {tier === "pro" ? (
              <div className="flex justify-between p-5">
                <p>Pro</p>
                <p>$10</p>
              </div>
            ) : (
              <div className="flex justify-between p-5">
                <p>Enterprise</p>
                <p>$100</p>
              </div>
            )}

            <div className=" underline w-full"></div>
            <div className="w-full">
              <PayPalButtons
                createSubscription={createSubscription}
                onApprove={onApprove}
                onError={onError}
                style={{
                  shape: "rect",
                  color: "gold",
                  layout: "vertical",
                  label: "subscribe",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
