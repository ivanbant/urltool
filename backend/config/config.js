import Config from "../models/configModel.js";

let configs;
async function config() {
  if (!configs) {
    configs = await Config.findOne({ current: true });
  }
  return configs;
}

// async function config() {
//   configs = await Config.create({
//     current: true,
//     plan: [
//       { paypal_id: "P-1", price: "0", tier: "Ureg", useLimit: 4 },
//       { paypal_id: "P-2", price: "0", tier: "Free", useLimit: 10 },
//       {
//         paypal_id: "P-07796694LN748203FMUQC5CY",
//         price: "8",
//         tier: "Pro",
//         useLimit: 100,
//       },
//       {
//         paypal_id: "P-34L94703JG574281FMXVFVIY",
//         price: "29",
//         tier: "Pro Plus",
//         useLimit: 500,
//       },
//     ],
//   });
// }
export default config;
