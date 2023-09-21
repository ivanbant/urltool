import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../services/UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const menuBtn = useRef(null);
  const menu = useRef(null);
  const toggleMobileMenu = () => {
    menuBtn.current.classList.toggle("open");
    menu.current.classList.toggle("flex");
    menu.current.classList.toggle("hidden");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        {/* <!-- Logo and Menu Container --> */}
        <div className="flex items-center space-x-20">
          <img src="/src/assets/images/logo.svg" alt="" />
          {/* <!-- Left Menu --> */}
          <div className="hidden lg:flex space-x-8 font-bold">
            <Link to="/">
              <div className="text-grayishViolet hover:text-veryDarkViolet">
                Home
              </div>
            </Link>
            <Link to="/pricing">
              <div className="text-grayishViolet hover:text-veryDarkViolet">
                Pricing
              </div>
            </Link>
            <Link to="/contact">
              <div className="text-grayishViolet hover:text-veryDarkViolet">
                Contact
              </div>
            </Link>
            <Link to="/about">
              <div className="text-grayishViolet hover:text-veryDarkViolet">
                About
              </div>
            </Link>
          </div>
        </div>
        {/* <!-- Right Menu --> */}

        {!user || user.isUnreg ? (
          <div className="hidden lg:flex items-center space-x-6 font-bold text-grayishViolet">
            <Link to="/login">
              {" "}
              <div className="hover:text-veryDarkViolet">Login</div>
            </Link>
            <Link to="/signup">
              <div className="px-8 py-3 font-bold text-white bg-cyan rounded-full hover:opacity-70">
                Sign Up
              </div>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 font-bold text-grayishViolet">
            <Link to="/dashboard">
              {" "}
              <div className="hover:text-veryDarkViolet">Dashboard</div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-8 py-3 font-bold text-white bg-cyan rounded-full hover:opacity-70 "
            >
              Logout
            </button>
          </div>
        )}

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
        className="hidden absolute p-6 rounded-lg bg-darkViolet left-6 right-6 top-20 z-40"
      >
        <div className="flex flex-col items-center justify-center w-full space-y-6 font-bold text-white rounded-sm">
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
