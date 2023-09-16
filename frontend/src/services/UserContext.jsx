import { createContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setCredentials, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
