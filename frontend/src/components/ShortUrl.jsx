const ShortUrl = ({ url }) => {
  return (
    <div className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row">
      <p className="font-bold text-center text-veryDarkViolet md:text-left">
        {url.originalUrl}
      </p>
      <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
        <div className="font-bold text-cyan">{url.shortUrl}</div>
        <div className="relative w-10 h-10">
          {url.qrImage ? (
            <div className="absolute w-10 h-10 hover: scale-110">
              <img className="w-full h-full" src={url.qrImage} alt="qr code" />
            </div>
          ) : (
            //  <img src="/src/assets/images/qr-code.svg" alt="qr code" />
            <></>
          )}
        </div>
        <button className="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none">
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShortUrl;
