import { useState } from "react";

const BuilderUrlForm = ({ shortenUrl }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [campaignSource, setCampaignSource] = useState("");
  const [campaignMedium, setCampaignMedium] = useState("");
  const [campaignNames, setCampaignNames] = useState("");

  const [urls, setUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    shortenUrl([urls]);
  };

  return (
    <form
      id="link-form"
      className="relative flex flex-col w-100 p-10 space-y-4 bg-darkViolet rounded-lg rounded-tl-none"
    >
      <input
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        type="text"
        className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
        placeholder="Your URL here..."
      />
      <div className="flex flex-col space-y-3 w-full md:flex-row md:space-x-3 md:space-y-0">
        <input
          value={campaignSource}
          onChange={(e) => setCampaignSource(e.target.value)}
          type="text"
          className="w-full md:w-1/2 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Campaign Source"
        />
        <input
          value={campaignMedium}
          onChange={(e) => setCampaignMedium(e.target.value)}
          type="text"
          className="w-full md:w-1/2 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
          placeholder="Campaign Medium"
        />
      </div>
      <input
        value={campaignNames}
        onChange={(e) => setCampaignNames(e.target.value)}
        type="text"
        className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
        placeholder="Campaign Names"
      />

      <button className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2">
        Shorten It!
      </button>
      {/* <!-- Error Message --> */}
      <div
        id="err-msg"
        className="absolute left-7 bottom-3 text-red text-sm italic"
      ></div>
    </form>
  );
};

export default BuilderUrlForm;
