const InfoSection = () => {
  return (
    <>
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-3">
          <h2 className="text-4xl mb-6 font-bold text-center">
            Advanced Statistics
          </h2>
          <p className="max-w-xs mx-auto text-center text-gray-400 md:max-w-md">
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>
      </section>

      {/* <!-- Feature Box Section --> */}

      <section className="pb-32 bg-gray-100">
        <div className="container relative flex flex-col items-start px-6 mx-auto md:flex-row md:space-x-7">
          {/* <!-- Horizontal Line --> */}
          <div className="hidden absolute top-24 left-16 h-3 bg-cyan md:block w-10/12"></div>
          {/* <!-- Vertical Line --> */}
          <div className="absolute w-2 h-full -ml-1 bg-cyan md:hidden left-1/2"></div>

          {/* <!-- Box 1 --> */}
          <div className="relative flex flex-col p-6 space-y-6 bg-white rounded-lg md:w-1/3">
            {/* <!-- Image Positioning --> */}
            <div className="absolute -ml-10 left-1/2 -top-10 md:left-16">
              {/* <!-- Image Container For Background & Center --> */}
              <div className="flex items-center justify-center w-20 h-20 p-4 rounded-full bg-veryDarkViolet">
                <img
                  src="/src/assets/images/icon-brand-recognition.svg"
                  alt=""
                />
              </div>
            </div>
            <h5 className="pt-6 text-xl font-bold text-center capitalize md:text-left">
              Brand Recognition
            </h5>
            <p className="text-center text-gray-400 md:text-left">
              Boost your brand recognition with each click. Generic links don't
              mean a thing. Branded links help instil confidence in your
              content.
            </p>
          </div>

          {/* <!-- Box 2 --> */}
          <div className="relative flex flex-col mt-24 p-6 space-y-6 bg-white rounded-lg md:w-1/3 md:mt-8">
            {/* <!-- Image Positioning --> */}
            <div className="absolute -ml-10 left-1/2 -top-10 md:left-16">
              {/* <!-- Image Container For Background & Center --> */}
              <div className="flex items-center justify-center w-20 h-20 p-4 rounded-full bg-veryDarkViolet">
                <img
                  src="/src/assets/images/icon-detailed-records.svg"
                  alt=""
                />
              </div>
            </div>
            <h5 className="pt-6 text-xl font-bold text-center capitalize md:text-left">
              Detailed records
            </h5>
            <p className="text-center text-gray-400 md:text-left">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>

          {/* <!-- Box 3 --> */}
          <div className="relative flex flex-col mt-24 p-6 space-y-6 bg-white rounded-lg md:w-1/3 md:mt-16">
            {/* <!-- Image Positioning --> */}
            <div className="absolute -ml-10 left-1/2 -top-10 md:left-16">
              {/* <!-- Image Container For Background & Center --> */}
              <div className="flex items-center justify-center w-20 h-20 p-4 rounded-full bg-veryDarkViolet">
                <img
                  src="/src/assets/images/icon-fully-customizable.svg"
                  alt=""
                />
              </div>
            </div>
            <h5 className="pt-6 text-xl font-bold text-center capitalize md:text-left">
              Fully customizable
            </h5>
            <p className="text-center text-gray-400 md:text-left">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoSection;
