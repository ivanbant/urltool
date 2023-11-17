import { useContext, useEffect, useState } from "react";
import UserUrlsTable from "../../components/UserUrlsTable";
import UserContext from "../../services/UserContext";

import axios from "axios";

const AnalyticsScreen = () => {
  const { user } = useContext(UserContext);

  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const fetchUrls = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/urls/user/${user._id}`,
        { withCredentials: true }
      );
      setUrls(data);
    };
    fetchUrls();
  }, [user._id]);

  return (
    <div className="flex flex-col p-5 items-center justify-center min-h-[50vh]">
      <UserUrlsTable urls={urls} />
    </div>
  );
};

export default AnalyticsScreen;
