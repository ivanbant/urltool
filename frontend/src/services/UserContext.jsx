import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import getBrowserFingerprint from "get-browser-fingerprint";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // set user id in local storage
  const setCredentials = (user) => {
    setUser(user);
    user.expireTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
    localStorage.setItem("userInfo", JSON.stringify(...user));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const createUnregUser = async () => {
    let fingerprint;
    try {
      fingerprint = getBrowserFingerprint({
        enableScreen: false,
        hardwareOnly: true,
        enableWebgl: true,
      });
    } catch (error) {
      fingerprint = 0;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/unreg",
        {
          fingerprint: fingerprint,
        },
        { withCredentials: true }
      );
      setCredentials({ ...data, isUnreg: true });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (localStorage.getItem("userInfo") && !user) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo.expireTime > new Date().getTime()) {
      setUser(userInfo);
    } else {
      Cookies.remove("jwt");
      createUnregUser();
    }
  }

  if (!localStorage.getItem("userInfo") && !user) {
    createUnregUser();
  }

  return (
    <UserContext.Provider value={{ user, setCredentials, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
