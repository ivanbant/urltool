import { Link } from "react-router-dom";

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
