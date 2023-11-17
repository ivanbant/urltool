import React from "react";

const ClicksTable = ({ data }) => {
  return (
    <div className="w-full">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/2">Date</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (click, index) =>
              click.dataValue > 0 && (
                <tr key={index}>
                  <td className="text-center">
                    {click.dataDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="text-center">{click.dataValue}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClicksTable;
