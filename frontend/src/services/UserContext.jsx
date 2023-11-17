import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import getBrowserFingerprint from "get-browser-fingerprint";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setCredentials = (user) => {
    setUser(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
  };
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const createUnregUser = async () => {
    try {
      const fingerprint = getBrowserFingerprint();
      const { data } = await axios.post(
        "http://localhost:5000/api/users/unreg",
        {
          fingerprint,
        },
        { withCredentials: true }
      );
      setCredentials({ ...data, isUnreg: true });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (!localStorage.getItem("userInfo") && !user) {
    createUnregUser();
  }
  if (localStorage.getItem("userInfo") && !user) {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }

  return (
    <UserContext.Provider value={{ user, setCredentials, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
