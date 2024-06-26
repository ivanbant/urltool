const Footer = () => {
  return (
    <footer className="py-16 bg-veryDarkViolet">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-16 md:flex-row md:space-y-0 md:items-start">
        {/* <!-- Logo --> */}
        {/* <img src="/src/assets/images/logo.svg" alt="" /> */}
        <h1 className=" text-4xl font-semibold text-gray-500">UrlTool</h1>

        {/* <!-- Menue Container --> */}
        <div className="flex flex-col space-y-16 md:space-x-20 md:flex-row md:space-y-0">
          {/* <!-- Menu 1 --> */}
          <div className="flex flex-col items-center w-full md:items-start">
            <div className="mb-5 font-bold text-white capitalize">Features</div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Link shortening
              </a>
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Branded Links
              </a>
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Analytics
              </a>
            </div>
          </div>

          {/* <!-- Menu 2 --> */}
          <div className="flex flex-col items-center w-full md:items-start">
            <div className="mb-5 font-bold text-white capitalize">
              Resources
            </div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Blog
              </a>
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Developers
              </a>
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Support
              </a>
            </div>
          </div>

          {/* <!-- Menu 3 --> */}
          <div className="flex flex-col items-center w-full md:items-start">
            <div className="mb-5 font-bold text-white capitalize">Company</div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                About
              </a>
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Our Team
              </a>
              <a
                href="#"
                className="capitalize text-grayishViolet hover:text-cyan"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* <!-- Social Container --> */}
        <div className="flex space-x-6">
          <a href="#">
            <img
              src="/src/assets/images/icon-facebook.svg"
              alt=""
              className="ficon"
            />
          </a>
          <a href="#">
            <img
              src="/src/assets/images/icon-twitter.svg"
              alt=""
              className="ficon"
            />
          </a>
          <a href="#">
            <img
              src="/src/assets/images/icon-pinterest.svg"
              alt=""
              className="ficon"
            />
          </a>
          <a href="#">
            <img
              src="/src/assets/images/icon-instagram.svg"
              alt=""
              className="ficon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
