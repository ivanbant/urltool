const UrlBuilder = () => {
  const currentDate = new Date();
  const localDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  return (
    <section className="relative bg-gray-100">
      {/* <!-- Shorten Container --> */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form
          id="link-form"
          className="relative flex flex-col w-100 p-10 -mt-20 space-y-4 bg-darkViolet rounded-lg md:flex-row md:space-y-0 md:space-x-3"
        >
          <input
            id="link-input"
            type="text"
            className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
            placeholder="Shorten a link here"
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
        {/* <!-- Link 1 --> */}
        <div className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row">
          <p className="font-bold text-center text-veryDarkViolet md:text-left">
            http://frontendmentor.io
          </p>
          <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
            <div className="font-bold text-cyan">http://rel.ink/g4Ah54</div>
            <button className="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none">
              Copy
            </button>
          </div>
        </div>

        {/* <!-- Link 2 --> */}
        <div className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row">
          <p className="font-bold text-center text-veryDarkViolet md:text-left">
            http://frontendmentor.io
          </p>
          <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
            <div className="font-bold text-cyan">http://rel.ink/g4Ah54</div>
            <button className="p-2 px-8 text-white bg-darkViolet rounded-lg hover:opacity-70 focus:outline-none">
              Copy
            </button>
          </div>
        </div>

        {/* <!-- Link 3 --> */}
        <div className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row">
          <p className="font-bold text-center text-veryDarkViolet md:text-left">
            http://frontendmentor.io
          </p>
          <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
            <div className="font-bold text-cyan">http://rel.ink/g4Ah54</div>
            <button className="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none">
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlBuilder;
