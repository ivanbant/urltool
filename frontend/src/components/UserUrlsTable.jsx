import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

const UserUrlsTable = ({ urls }) => {
  return (
    <div className="w-full">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/2">Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>
                {" "}
                <Link to={`/dashboard/analytics/${url._id}`}>
                  <FaChartLine className=" text-blue-700 text-lg inline" />{" "}
                  {url.originalUrl}
                </Link>{" "}
              </td>
              <td>{url.shortUrl}</td>
              <td className="text-center">{url.clicks}</td>
              <td className="text-center">{url.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserUrlsTable;
