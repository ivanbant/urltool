import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const [userSubscription, setUserSubscription] = useState({});
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  async function getInvoices() {
    const { data } = await axios.get(
      "http://localhost:5000/api/subscription/invoices",
      {
        withCredentials: true,
      }
    );
    setInvoices(data);
  }

  async function getUserSupscription() {
    const { data } = await axios.get(
      "http://localhost:5000/api/subscription/",
      {
        withCredentials: true,
      }
    );
    setUserSubscription(data);
  }

  function subscriptionUpgradeHandler() {
    navigate("/checkout");
  }

  useEffect(() => {
    getInvoices();
    getUserSupscription();
  }, []);

  return (
    <div className="flex flex-col p-10 space-y-4 min-h-screen">
      <div>
        <h2 className="text-lg font-semibold">Subscription</h2>
        <div className="flex justify-between m-2 items-center">
          <div className="flex ">
            <h3>Tier: </h3>
            <p className="font-semibold">{user.tier}</p>
          </div>
          {user.tier === "Free" && (
            <div className="flex">
              <h3>Payment: </h3>
              <p className="font-semibold">{userSubscription.paymentMethod}</p>
            </div>
          )}
          {user.tier === "Free" && (
            <div className="flex">
              <h3>Created: </h3>
              <p className="font-semibold">
                {new Date(userSubscription.startTime).toLocaleDateString()}
              </p>
            </div>
          )}
          {user.tier === "Free" && (
            <div className="flex">
              <h3>Next Billing Date: </h3>
              <p className="font-semibold">
                {new Date(
                  userSubscription.nextBillingDate
                ).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex space-x-1">
            {user.tier !== "Pro Plus" && (
              <button
                onClick={subscriptionUpgradeHandler}
                className="px-5 py-2 text-white bg-cyan rounded-sm hover:bg-cyanLight focus:outline-none md:py-2"
              >
                Upgrade
              </button>
            )}
            {user.tier !== "Free" && (
              <a
                href={userSubscription.cancelLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-white bg-red-700 rounded-sm hover:bg-red-600 focus:outline-none md:py-2"
              >
                Cancel
              </a>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Payments</h2>
        <div className="p-2">
          <table className="w-full">
            <thead className=" h-12 bg-slate-100">
              <tr>
                <th>Charged On</th>
                <th>Amount</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="h-8">
                  <td className="text-center">
                    {new Date(invoice.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-center">{invoice.amount}$</td>
                  <td className=" text-center font-bold text-cyan hover:text-cyanLight cursor-pointer">
                    {invoice.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
