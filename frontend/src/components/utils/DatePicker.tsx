import React, { useContext, useState, createContext } from "react";
import Calendar from "./Calendar";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { set } from "mongoose";

function DatePicker() {
  const { selectedStartDate, selectedEndDate, limiters, handleDateSelect } =
    useContext(DatePickerContext);
  const [firstCalendarDate, setFirstCalendarDate] = useState(
    selectedStartDate || new Date()
  );
  const [secondCalendarDate, setSecondCalendarDate] = useState(
    selectedEndDate || new Date()
  );

  const firstCalendarMonth = firstCalendarDate.toLocaleString("default", {
    month: "long",
  });
  const firstCalendarYear = firstCalendarDate.getFullYear();

  const secondCalendarMonth = secondCalendarDate.toLocaleString("default", {
    month: "long",
  });
  const secondCalendarYear = secondCalendarDate.getFullYear();

  const prevFirstCalendarMonth = () => {
    if (!firstCalendarDate) return;
    if (
      firstCalendarDate.getFullYear() === limiters.minDate.getFullYear() &&
      firstCalendarDate.getMonth() <= limiters.minDate.getMonth()
    ) {
      return;
    }
    setFirstCalendarDate(
      new Date(
        firstCalendarDate.getFullYear(),
        firstCalendarDate.getMonth() - 1
      )
    );
  };

  const nextFirstCalendarMonth = () => {
    if (
      firstCalendarDate.getFullYear() === limiters.maxDate.getFullYear() &&
      firstCalendarDate.getMonth() >= limiters.maxDate.getMonth()
    ) {
      return;
    }
    firstCalendarDate &&
      setFirstCalendarDate(
        new Date(
          firstCalendarDate.getFullYear(),
          firstCalendarDate.getMonth() + 1
        )
      );
  };

  const prevSecondCalendarMonth = () => {
    if (!secondCalendarDate) return;
    if (
      secondCalendarDate.getFullYear() === limiters.minDate.getFullYear() &&
      secondCalendarDate.getMonth() <= limiters.minDate.getMonth()
    ) {
      return;
    }
    setSecondCalendarDate(
      new Date(
        secondCalendarDate.getFullYear(),
        secondCalendarDate.getMonth() - 1
      )
    );
  };

  const nextSecondCalendarMonth = () => {
    if (
      secondCalendarDate.getFullYear() === limiters.maxDate.getFullYear() &&
      secondCalendarDate.getMonth() >= limiters.maxDate.getMonth()
    ) {
      return;
    }
    secondCalendarDate &&
      setSecondCalendarDate(
        new Date(
          secondCalendarDate.getFullYear(),
          secondCalendarDate.getMonth() + 1
        )
      );
  };

  return (
    <div className="flex space-x-4 w-[580px]">
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between items-center mx-auto w-full">
          <div
            onClick={prevFirstCalendarMonth}
            className=" cursor-pointer text-center"
          >
            <RiArrowDropLeftLine size={40} />
          </div>
          <div className="flex flex-row items-center text-2xl">
            <p>
              {firstCalendarMonth}, {firstCalendarYear}
            </p>
          </div>
          <div
            onClick={nextFirstCalendarMonth}
            className="cursor-pointer text-center"
          >
            <RiArrowDropRightLine size={40} />
          </div>
        </div>
        <Calendar date={firstCalendarDate} />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between items-center mx-auto w-full">
          <div
            onClick={prevSecondCalendarMonth}
            className=" cursor-pointer text-center"
          >
            <RiArrowDropLeftLine size={40} />
          </div>
          <div className="flex flex-row items-center text-2xl">
            <p>
              {secondCalendarMonth}, {secondCalendarYear}
            </p>
          </div>
          <div
            onClick={nextSecondCalendarMonth}
            className="cursor-pointer text-center"
          >
            <RiArrowDropRightLine size={40} />
          </div>
        </div>
        <Calendar date={secondCalendarDate} />
      </div>
    </div>
  );
}

export default DatePicker;

export const DatePickerContext = createContext({
  selectedStartDate: new Date(new Date().setDate(new Date().getDate() - 7)),
  selectedEndDate: new Date(),
  dataStartDate: new Date(new Date().setDate(new Date().getDate() - 7)),
  dataEndDate: new Date(),
  handleDateSelect: (date) => {},
  updateDatesHandler: () => {},
  limiters: {
    minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    maxDate: new Date(),
  },
});

export const DatePickerProvider = ({ children }) => {
  const [changeStartDate, setChangeStartDate] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [dataStartDate, setDataStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [dataEndDate, setDataEndDate] = useState(new Date());

  const [limiters, setLimiters] = useState({
    minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    maxDate: new Date(),
  });

  const isDateGreater = (date1, date2) => {
    if (date1.getFullYear() > date2.getFullYear()) {
      return true;
    } else if (date1.getFullYear() === date2.getFullYear()) {
      if (date1.getMonth() > date2.getMonth()) {
        return true;
      } else if (date1.getMonth() === date2.getMonth()) {
        return date1.getDate() > date2.getDate();
      }
    }
    return false;
  };

  const handleDateSelect = (date) => {
    if (isDateGreater(date, selectedEndDate)) {
      setSelectedEndDate(date);
      setChangeStartDate(true);
      return;
    }
    if (isDateGreater(selectedStartDate, date)) {
      setSelectedStartDate(date);
      setChangeStartDate(false);
      return;
    }
    if (changeStartDate) {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
    setChangeStartDate(!changeStartDate);
  };

  const updateDatesHandler = () => {
    setDataStartDate(selectedStartDate);
    setDataEndDate(selectedEndDate);
  };

  return (
    <DatePickerContext.Provider
      value={{
        selectedStartDate,
        selectedEndDate,
        dataStartDate,
        dataEndDate,
        handleDateSelect,
        limiters,
        updateDatesHandler,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};
