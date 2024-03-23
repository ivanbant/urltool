import { Link } from "react-router-dom";

const PlansSection = () => {
  return (
    <section className=" pt-16 pb-24 flex flex-col w-full bg-slate-800 space-y-10">
      <div className="container mx-auto px-3">
        <h2 className="text-4xl mb-6 font-bold text-center text-gray-100">
          Create Your Account Today
        </h2>
        <p className="max-w-xs mx-auto text-center text-gray-100 md:max-w-md">
          Track how your links are performing across the web with our utm and
          short link builder.
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col my-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6 md:my-0">
          <div className="bg-slate-700 rounded-xl text-white">
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-800">
              <div className="text-center uppercase">Free</div>
              <h2 className="mt-10 font-serif text-5xl text-center">
                10 Links/Month
              </h2>
              <h3 className="mt-2 text-center">$0/Month</h3>
              <div className="flex justify-center">
                <Link
                  to="/signup"
                  href="#"
                  className="inline-block px-10 py-3 my-6 text-center border border-violet-600 rounded-lg hover:bg-violet-800 hover:border-violet-800 duration-200"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-700"></div>

            <div className="p-8 mx-3 mb-3 rounded-b-xl bg-slate-800">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-violet-600 rounded-xl text-white">
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-800">
              <div className="text-center uppercase">Pro</div>
              <h2 className="mt-10 font-serif text-5xl text-center">
                30 Links/Month
              </h2>
              <h3 className="mt-2 text-center">$10/Month</h3>
              <div className="flex justify-center">
                <Link
                  to="/checkout"
                  href="#"
                  className="inline-block px-10 py-3 my-6 text-center border border-violet-600 bg-violet-600 rounded-lg hover:bg-violet-800 hover:border-violet-800 duration-200"
                >
                  Purchase
                </Link>
              </div>
            </div>

            <div className="border-t border-violet-600"></div>

            <div className="p-8 mx-3 mb-3 rounded-b-xl bg-slate-800">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-xl text-white">
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-800">
              <div className="text-center uppercase">Pro Plus</div>
              <h2 className="mt-10 font-serif text-5xl text-center">
                100 Links/Month
              </h2>
              <h3 className="mt-2 text-center">$30/Month</h3>
              <div className="flex justify-center">
                <Link
                  to="/checkout"
                  href="#"
                  className="inline-block px-10 py-3 my-6 text-center border border-violet-600 rounded-lg hover:bg-violet-800 hover:border-violet-800 duration-200"
                >
                  Purchase
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-700"></div>

            <div className="p-8 mx-3 mb-3 rounded-b-xl bg-slate-800">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-sm ml-1">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
