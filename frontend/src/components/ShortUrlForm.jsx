import { useState } from "react";

const ShortUrlForm = ({ shortenUrl, makeQr }) => {
  const [url, setUrl] = useState("");

  return (
    <div className="relative flex flex-col w-100 p-10  space-y-4 bg-darkViolet rounded-b-lg rounded-tr-lg md:flex-row md:space-y-0 md:space-x-3">
      <input
        id="link-input"
        type="text"
        className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
        placeholder="Shorten a link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={() => shortenUrl([url])}
        className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2"
      >
        Shorten!
      </button>
      <button
        onClick={() => makeQr([url])}
        className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2"
      >
        Make QR!
      </button>
      {/* <!-- Error Message --> */}
      <div
        id="err-msg"
        className="absolute left-7 bottom-3 text-red text-sm italic"
      ></div>
    </div>
  );
};

export default ShortUrlForm;
