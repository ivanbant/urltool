import React, { useContext, useState } from "react";
import DatePicker, { DatePickerContext } from "./DatePicker";

const DateRangeBox = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const { updateDatesHandler, dataStartDate, dataEndDate } =
    useContext(DatePickerContext);
  return (
    <div className=" relative">
      <div
        className="flex w-fit items-center justify-center m-2 border border-black p-2"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <p>
          {formatDate(dataStartDate)} - {formatDate(dataEndDate)}
        </p>
      </div>
      {modalOpen && (
        <div className="absolute right-0 top-14 flex flex-col items-end justify-center border border-black p-5 bg-white">
          <DatePicker />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => {
              updateDatesHandler();
              setModalOpen(false);
            }}
          >
            {" "}
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangeBox;
