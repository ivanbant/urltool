import React from "react";

const SubscriptionScreen = () => {
  return (
    <div className="flex flex-col p-10 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Subscription</h2>
        <div className="flex justify-between m-2 items-center">
          <div className="flex ">
            <h3>Tier: </h3>
            <p className="font-semibold">Pro</p>
          </div>
          <div className="flex">
            <h3>Payment: </h3>
            <p className="font-semibold">Paypal</p>
          </div>
          <div className="flex">
            <h3>Created: </h3>
            <p className="font-semibold">08/03/2024</p>
          </div>
          <div className="flex space-x-1">
            <button className="px-5 py-2 text-white bg-cyan rounded-sm hover:bg-cyanLight focus:outline-none md:py-2">
              Upgrade
            </button>
            <button className="px-5 py-2 text-white bg-red-700 rounded-sm hover:bg-red-600 focus:outline-none md:py-2">
              Cancel
            </button>
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
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-8">
                <td>08/03/2024</td>
                <td className=" text-center font-bold text-cyan hover:text-cyanLight cursor-pointer">
                  I-9842313
                </td>
              </tr>
              <tr className="h-8">
                <td>08/03/2024</td>
                <td className="text-center font-bold text-cyan hover:text-cyanLight cursor-pointer">
                  I-9842313
                </td>
              </tr>
              <tr className="h-8">
                <td>08/03/2024</td>
                <td className="text-center font-bold text-cyan hover:text-cyanLight cursor-pointer">
                  I-9842313
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
