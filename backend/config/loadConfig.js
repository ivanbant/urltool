import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function loadConfig() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const config = {
    plan: [
      { id: "P-1", tier: "Ureg", useLimit: 4 },
      { id: "P-2", tier: "Free", useLimit: 10 },
      { id: "P-07796694LN748203FMUQC5CY", tier: "Pro", useLimit: 30 },
      {
        id: "P-34L94703JG574281FMXVFVIY",
        tier: "Pro Plus",
        useLimit: 50,
      },
    ],
  };

  fs.writeFile(
    path.join(__dirname, "config.json"),
    JSON.stringify(config),
    (err) => {
      if (err) throw err;
      console.log("Config loaded");
    }
  );
}

export default loadConfig;
