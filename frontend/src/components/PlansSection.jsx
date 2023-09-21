const PlansSection = () => {
  return (
    <section className=" pt-16 pb-24 flex flex-col w-full bg-slate-800 space-y-10">
      <div className="container mx-auto px-3">
        <h2 className="text-4xl mb-6 font-bold text-center text-gray-100">
          Advanced Statistics
        </h2>
        <p className="max-w-xs mx-auto text-center text-gray-100 md:max-w-md">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col my-6 space-y-6 md:flex-row md:space-y-0 md:space-x-6 md:my-0">
          <div className="bg-slate-700 rounded-xl text-white">
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-800">
              <div className="text-center uppercase">Basic</div>
              <h2 className="mt-10 font-serif text-5xl text-center">100GB</h2>
              <h3 className="mt-2 text-center">$1.99/Month</h3>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-block px-10 py-3 my-6 text-center border border-violet-600 rounded-lg hover:bg-violet-800 hover:border-violet-800 duration-200"
                >
                  Purchase
                </a>
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
                  <span className="text-sm ml-1">100 GB of storage</span>
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
                  <span className="text-sm ml-1">Option to add members</span>
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
                  <span className="text-sm ml-1">Extra member benefits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-violet-600 rounded-xl text-white">
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-800">
              <div className="text-center uppercase">Standart</div>
              <h2 className="mt-10 font-serif text-5xl text-center">200GB</h2>
              <h3 className="mt-2 text-center">$3.99/Month</h3>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-block px-10 py-3 my-6 text-center border border-violet-600 bg-violet-600 rounded-lg hover:bg-violet-800 hover:border-violet-800 duration-200"
                >
                  Purchase
                </a>
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
                  <span className="text-sm ml-1">200 GB of storage</span>
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
                  <span className="text-sm ml-1">Option to add members</span>
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
                  <span className="text-sm ml-1">Extra member benefits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-xl text-white">
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-slate-800">
              <div className="text-center uppercase">Premium</div>
              <h2 className="mt-10 font-serif text-5xl text-center">2 TB</h2>
              <h3 className="mt-2 text-center">$8.99/Month</h3>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-block px-10 py-3 my-6 text-center border border-violet-600 rounded-lg hover:bg-violet-800 hover:border-violet-800 duration-200"
                >
                  Purchase
                </a>
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
                  <span className="text-sm ml-1">2 TB of storage</span>
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
                  <span className="text-sm ml-1">Option to add members</span>
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
                  <span className="text-sm ml-1">Extra member benefits</span>
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
