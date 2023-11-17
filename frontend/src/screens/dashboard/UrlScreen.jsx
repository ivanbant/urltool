import React, { useContext, useEffect, useState } from "react";
import ClicksChart from "../../components/ClicksChart";
import {
  DatePickerContext,
  DatePickerProvider,
} from "../../components/utils/DatePicker";
import ClicksTable from "../../components/ClicksTable";
import { useParams } from "react-router-dom";
import axios from "axios";

const UrlScreen = () => {
  const { urlId } = useParams();

  const [clicks, setClicks] = useState([]);
  const { dataStartDate, dataEndDate } = useContext(DatePickerContext);

  const getTimedClicksArray = (startDate, endDate, clicks) => {
    let clicksArray = [];
    let currentDate = new Date(startDate);

    const isSameDay = (date1, date2) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    while (currentDate <= endDate) {
      clicksArray.push({
        dataDate: new Date(currentDate),
        dataValue:
          clicks.filter((click) =>
            isSameDay(new Date(click.createdAt), currentDate)
          ).length || 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return clicksArray;
  };

  const toLocalISOString = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchClicks = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/urls/clicks/${urlId}?startDate=${toLocalISOString(
          dataStartDate
        )}&endDate=${toLocalISOString(dataEndDate)}`,
        { withCredentials: true }
      );
      setClicks(data);
    };
    fetchClicks();
  }, [urlId, dataStartDate, dataEndDate]);

  const dataArray = getTimedClicksArray(
    new Date(
      dataStartDate.getFullYear(),
      dataStartDate.getMonth(),
      dataStartDate.getDate()
    ),
    new Date(
      dataEndDate.getFullYear(),
      dataEndDate.getMonth(),
      dataEndDate.getDate()
    ),
    clicks
  );

  return (
    <div className="flex flex-col space-y-5 p-5 items-center justify-center min-h-[50vh]">
      <ClicksChart data={dataArray} />
      <ClicksTable data={dataArray} />
    </div>
  );
};

export default UrlScreen;
