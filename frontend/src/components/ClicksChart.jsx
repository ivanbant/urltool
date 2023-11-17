import LineChart from "./utils/LineChart";
import DateRangeBox from "./utils/DateRangeBox";

const ClicksChart = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="flex justify-end w-full">
        <DateRangeBox />
      </div>
      <div className="w-full mx-auto h-[400px] shadow-md">
        <LineChart data={data} />
      </div>
    </div>
  );
};

export default ClicksChart;
