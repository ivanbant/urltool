import { useRef } from "react";

const Header = () => {
  const menuBtn = useRef(null);
  const menu = useRef(null);
  const toggleMobileMenu = () => {
    menuBtn.current.classList.toggle("open");
    menu.current.classList.toggle("flex");
    menu.current.classList.toggle("hidden");
  };
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        {/* <!-- Logo and Menu Container --> */}
        <div className="flex items-center space-x-20">
          <img src="/src/assets/images/logo.svg" alt="" />
          {/* <!-- Left Menu --> */}
          <div className="hidden lg:flex space-x-8 font-bold">
            <a
              href="#"
              className="text-grayishViolet hover:text-veryDarkViolet"
            >
              Features
            </a>
            <a
              href="#"
              className="text-grayishViolet hover:text-veryDarkViolet"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-grayishViolet hover:text-veryDarkViolet"
            >
              Resources
            </a>
          </div>
        </div>
        {/* <!-- Right Menu --> */}
        <div className="hidden lg:flex items-center space-x-6 font-bold text-grayishViolet">
          <div className="hover:text-veryDarkViolet">Login</div>
          <a
            href=""
            className="px-8 py-3 font-bold text-white bg-cyan rounded-full hover:opacity-70"
          >
            Sign Up
          </a>
        </div>

        {/* <!-- Hamburger Button --> */}
        <button
          id="menu-btn"
          className="block hamburger lg:hidden focus:outline-none"
          type="button"
          onClick={toggleMobileMenu}
          ref={menuBtn}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* <!-- Mobile Menu --> */}

      <div
        ref={menu}
        class="hidden absolute p-6 rounded-lg bg-darkViolet left-6 right-6 top-20 z-40"
      >
        <div class="flex flex-col items-center justify-center w-full space-y-6 font-bold text-white rounded-sm">
          <a href="#" className="w-full text-center">
            Features
          </a>
          <a href="#" className="w-full text-center">
            Pricing
          </a>
          <a href="#" className="w-full text-center">
            Resources
          </a>
          <a
            href="#"
            className="w-full pt-6 border-t border-gray-400 text-center"
          >
            Login
          </a>
          <a
            href="#"
            className="w-full py-3 rounded-full bg-cyan hover:scale-105 text-center"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
