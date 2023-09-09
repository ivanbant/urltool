const Hero = () => {
  return (
    <section>
      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row">
        {/* <!-- Content Container --> */}
        <div className="flex flex-col space-y-10 mb-44 lg:mt-16 lg:w-1/2 xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
            More than just shorter links
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Build your brand's recognition and get detailed insights on how your
            links are performing.
          </p>
          <div className="mx-auto lg:mx-0">
            <a
              href="#"
              className="py-5 px-10 text-2xl font-bold text-white bg-cyan rounded-full lg:py-4 hover:opacity-70"
            >
              Get Started
            </a>
          </div>
        </div>
        {/* <!-- Image --> */}
        <div className="mb-24 mx-auto md:w-180 lg:w-1/2 lg:mb-0">
          <img src="/src/assets/images/illustration-working.svg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
