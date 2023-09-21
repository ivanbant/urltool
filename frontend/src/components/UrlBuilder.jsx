import { useContext, useState } from "react";
import axios from "axios";
import ShortUrl from "./ShortUrl";
import ShortUrlForm from "./ShortUrlForm";
import BuilderUrlForm from "./BuilderUrlForm";
import UserContext from "../services/UserContext";

const UrlBuilder = () => {
  // const currentDate = new Date();
  // const localDate = `${currentDate.getFullYear()}-${String(
  //   currentDate.getMonth() + 1
  // ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  const { user } = useContext(UserContext);
  const [simpleBuilder, setSimpleBuilder] = useState(true);
  const [shortUrls, setShortUrls] = useState([]);

  const shortenUrl = async (originalUrls) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/urls", {
        originalUrls,
        userId: user._id,
      });

      let filteredUrls = shortUrls;
      data.forEach((dataItem) => {
        filteredUrls = filteredUrls.filter(
          (shortUrlItem) => shortUrlItem.shortUrl !== dataItem.shortUrl
        );
      });
      setShortUrls([...data, ...filteredUrls]);
    } catch (error) {
      console.log(error.message || error.message.data || error);
    }
  };

  return (
    <section className="relative bg-gray-100">
      {/* <!-- Shorten Container --> */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className=" -mt-36">
          {simpleBuilder ? (
            <>
              <div className="flex flex-row justify-start">
                <div className="py-3 px-5 bg-darkViolet text-white rounded-t-lg cursor-pointer">
                  Url Short
                </div>
                <div
                  onClick={() => setSimpleBuilder(false)}
                  className="py-3 px-5 border border-darkViolet text-darkViolet rounded-t-lg cursor-pointer"
                >
                  Url Builder
                </div>
              </div>
              <ShortUrlForm shortenUrl={shortenUrl} />
            </>
          ) : (
            <>
              <div className="flex flex-row justify-start">
                <div
                  onClick={() => setSimpleBuilder(true)}
                  className="py-3 px-5 border border-darkViolet text-darkViolet  rounded-t-lg  cursor-pointer "
                >
                  Url Short
                </div>
                <div className="py-3 px-5   rounded-t-lg bg-darkViolet text-white cursor-pointer">
                  Url Builder
                </div>
              </div>
              <BuilderUrlForm shortenUrl={shortenUrl} />
            </>
          )}
        </div>
        {/* <!-- Shortened Links --> */}
        {shortUrls.length > 1 && (
          <div className="flex space-x-3">
            <button className="px-5 py-2 text-sm text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2">
              Select All
            </button>
            <button className="px-5 py-2 text-sm text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2">
              Copy Selected
            </button>
          </div>
        )}
        {shortUrls.map((current, index) => (
          <ShortUrl key={index} url={current} />
        ))}
      </div>
    </section>
  );
};

export default UrlBuilder;
