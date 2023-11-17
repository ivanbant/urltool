import { useContext, useState } from "react";
import { DatePickerContext } from "./DatePicker";

function Calendar(props) {
  const { date } = props;

  const { selectedStartDate, selectedEndDate, handleDateSelect, limiters } =
    useContext(DatePickerContext);
  const { minDate, maxDate } = limiters;

  const month = date.getMonth();
  const year = date.getFullYear();

  // Get number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get the day of the week of the first day of the month
  const firstDay = new Date(year, month, 1).getDay();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create an array for the days of the month
  let daysOfMonth = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i);
  }
  // Add empty days at the start for correct weekday alignment
  for (let i = 0; i < firstDay; i++) {
    daysOfMonth.unshift(null);
  }

  const handleDateClick = (day) => {
    handleDateSelect(new Date(year, month, day));
  };

  const checkIfDateLowerThanMin = (day) => {
    return minDate && new Date(year, month, day) < minDate;
  };
  const checkIfDateHigherThanMax = (day) => {
    return maxDate && new Date(year, month, day) > maxDate;
  };
  const checkIfDateEqualToSelectedDate = (day) => {
    return (
      (year === selectedStartDate?.getFullYear() &&
        month === selectedStartDate?.getMonth() &&
        day === selectedStartDate?.getDate()) ||
      (year === selectedEndDate?.getFullYear() &&
        month === selectedEndDate?.getMonth() &&
        day === selectedEndDate?.getDate())
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1?.getFullYear() === date2?.getFullYear() &&
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getDate() === date2?.getDate()
    );
  };
  const checkIfDateBetweenToSelectedDates = (day) => {
    return (
      new Date(year, month, day) > selectedStartDate &&
      new Date(year, month, day) < selectedEndDate
    );
  };

  return (
    <div className="grid grid-cols-7 gap-0">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="w-full m-0 p-0 text-center select-none ">
          {day}
        </div>
      ))}
      {daysOfMonth.map((day, index) => (
        <div
          key={index}
          onClick={() =>
            day
              ? checkIfDateLowerThanMin(day) || checkIfDateHigherThanMax(day)
                ? null
                : handleDateClick(day)
              : null
          }
          className={`w-full m-0 p-0 text-center h-10  flex items-center text-white cursor-pointer justify-center select-none ${
            day &&
            selectedStartDate &&
            selectedEndDate &&
            (checkIfDateBetweenToSelectedDates(day) ||
              checkIfDateEqualToSelectedDate(day)) &&
            ` bg-blue-200`
          } ${
            isSameDay(new Date(year, month, day), selectedStartDate)
              ? ` rounded-l-full `
              : isSameDay(new Date(year, month, day), selectedEndDate)
              ? ` rounded-r-full `
              : ``
          }`}
        >
          <div
            className={`text-center h-10 w-10 flex items-center justify-center rounded-full select-none 
              ${
                day && selectedStartDate && checkIfDateEqualToSelectedDate(day)
                  ? `  cursor-pointer bg-blue-400 hover:bg-blue-300`
                  : day &&
                    (checkIfDateLowerThanMin(day) ||
                      checkIfDateHigherThanMax(day))
                  ? ` text-gray-500`
                  : day &&
                    `cursor-pointer hover:bg-gray-100 text-gray-500 hover:text-gray-700`
              }`}
          >
            {day}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
