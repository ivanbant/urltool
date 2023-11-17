import { useState, Fragment, useRef, useEffect } from "react";

const LineChart = ({ data }) => {
  const svgRef = useRef(null);
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

  const [svgWidth, setSvgWidth] = useState(null);
  const [svgHeight, setSvgHeight] = useState(null);
  const [pathD, setPathD] = useState("");

  const roundUp = (num) => {
    if (num <= 10) return 10;
    const length = num.toString().length;
    const divisor = Math.pow(10, length - 1);
    return Math.ceil(num / divisor) * divisor;
  };
  const maxY = roundUp(Math.max(...data.map((item) => item.dataValue)));
  const yAxes = {
    lable: "Clicks",
    min: 0,
    max: roundUp(Math.max(...data.map((item) => item.dataValue))),
    step: maxY / 5,
  };

  const xAxes = {
    lable: "Days",
    min: 0,
    max: data.length,
    step: 1,
  };
  const circleCountY = (yAxes.max - yAxes.min) / yAxes.step + 1;
  const circleCountX = (xAxes.max - xAxes.min) / xAxes.step;

  useEffect(() => {
    if (svgRef.current) {
      setSvgWidth(svgRef.current.clientWidth);
      setSvgHeight(svgRef.current.clientHeight);
      let tempPathD = `M ${(svgWidth * positionX(0)) / 100} ${pathPositionY(
        data[0].dataValue
      )}`;
      for (let i = 1; i < data.length; i++) {
        tempPathD += ` L ${(svgWidth * positionX(i)) / 100} ${pathPositionY(
          data[i].dataValue
        )}`;
      }
      setPathD(tempPathD);
    }
  }, []);

  const positionX = (i) => {
    return ((i * xAxes.step) / (xAxes.max - xAxes.min - 1)) * 90 + 5;
  };
  const positionY = (i) => {
    return 90 - ((i * yAxes.step) / (yAxes.max - yAxes.min)) * 80;
  };

  const pathPositionY = (value) => {
    return ((90 - (value / (yAxes.max - yAxes.min)) * 80) / 100) * svgHeight;
  };

  useEffect(() => {
    let tempPathD = `M ${(svgWidth * positionX(0)) / 100} ${pathPositionY(
      data[0].dataValue
    )}`;
    for (let i = 1; i < data.length; i++) {
      tempPathD += ` L ${(svgWidth * positionX(i)) / 100} ${pathPositionY(
        data[i].dataValue
      )}`;
    }
    setPathD(tempPathD);
  }, [data, svgHeight, svgWidth]);

  return (
    <div className="p-6 pb-10 h-full ">
      <h2 className="text-lg">Clicks </h2>
      <svg ref={svgRef} width="100%" height="100%">
        <line
          x1="5%"
          y1="10%"
          x2="5%"
          y2="90%"
          style={{
            stroke: "rgb(31 41 55)",
            strokeWidth: 2,
          }}
        />

        <line
          x1="5%"
          y1="90%"
          x2="95%"
          y2="90%"
          style={{
            stroke: "rgb(31 41 55)",
            strokeWidth: 2,
          }}
        />

        {Array.from({ length: circleCountX }).map((_, i) => (
          <Fragment key={i}>
            <circle
              cx={`${positionX(i)}%`}
              cy="90%"
              r="3"
              fill="rgb(31 41 55)"
            />
            <text
              x={`${positionX(i)}%`}
              y="92%"
              fill="rgb(31 41 55)"
              fontSize="10px"
              textAnchor="middle"
              dy="1em"
            >
              {data[i].dataDate.getDate()}
            </text>

            {data[i].dataDate.getDate() === 1 && (
              <text
                x={`${positionX(i)}%`}
                y="96%"
                fill="rgb(31 41 55)"
                fontSize="10px"
                // fontWeight={600}
                textAnchor="middle"
                dy="1em"
              >
                {monthNames[data[i].dataDate.getMonth()]}
              </text>
            )}
          </Fragment>
        ))}
        {!(data[0].dataDate.getDate() === 1) && (
          <text
            x="5%"
            y="96%"
            fill="rgb(31 41 55)"
            fontSize="10px"
            // fontWeight={600}
            textAnchor="middle"
            dy="1em"
          >
            {monthNames[data[0].dataDate.getMonth()]}
          </text>
        )}

        {Array.from({ length: circleCountY }).map((_, i) => (
          <Fragment key={i}>
            <circle
              key={i}
              cx="5%"
              cy={`${positionY(i)}%`}
              r="3"
              fill="rgb(31 41 55)"
            />
            <text
              x="3.5%"
              y={`${positionY(i) - 2}%`}
              fill="rgb(31 41 55)"
              fontSize="10px"
              textAnchor="middle"
              dy="1em"
            >
              {i * yAxes.step}
            </text>

            <line
              x1="5%"
              y1={`${positionY(i)}%`}
              x2="95%"
              y2={`${positionY(i)}%`}
              style={{
                stroke: "rgb(31 41 55)",
                strokeWidth: 0.5,
                opacity: 0.3,
              }}
            />
          </Fragment>
        ))}

        <path
          d={pathD}
          style={{
            stroke: "rgb(31 41 55)",
            strokeWidth: 2,
          }}
          fill="none"
        />
        {data.map(
          (item, i) =>
            item.dataValue > 0 && (
              <g className="group" key={i}>
                <circle
                  cx={`${positionX(i)}%`}
                  cy={`${pathPositionY(data[i].dataValue)}`}
                  r="7%"
                  fill="transparent"
                />
                <circle
                  cx={`${positionX(i)}%`}
                  cy={`${pathPositionY(data[i].dataValue)}`}
                  r="4"
                  // fill="rgb(31 41 55)"
                  className="fill-current  opacity-0 group-hover:opacity-100 transition duration-500"
                />
                <line
                  x1={`${positionX(i)}%`}
                  y1={`${pathPositionY(data[i].dataValue)}`}
                  x2={`${positionX(i)}%`}
                  y2="90%"
                  className="fill-current  opacity-0 group-hover:opacity-70 transition duration-500"
                  style={{
                    stroke: "rgb(31 41 55)",
                    strokeWidth: 0.5,
                  }}
                />

                <foreignObject
                  x={`${positionX(i) + 0.2}%`}
                  y={`${pathPositionY(data[i].dataValue) + 1}`}
                  width="50"
                  height="40"
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="text-xs text-center border border-black rounded-md p-2 bg-white opacity-0 group-hover:opacity-100"
                  >
                    {data[i].dataValue}
                  </div>
                </foreignObject>
              </g>
            )
        )}
        {/* <g class="group">

        <circle cx="150" cy="150" r="60" fill="transparent" />
        

        <circle cx="150" cy="150" r="40" class="fill-current text-blue-500 group:hover:text-red-500 transition duration-300" />
    </g> */}
        {/* <circle
          cx={svgWidth * 0.15}
          cy={svgHeight * 0.9}
          r="3"
          fill="rgb(31 41 55)"
        /> */}
      </svg>
    </div>
  );
};

export default LineChart;

// function catmullRomToBezier(p0, p1, p2, p3) {
//   const tension = 0.5;  // Adjust as needed

//   const cp1x = p1[0] + (p2[0] - p0[0]) / 6 * tension;
//   const cp1y = p1[1] + (p2[1] - p0[1]) / 6 * tension;

//   const cp2x = p2[0] - (p3[0] - p1[0]) / 6 * tension;
//   const cp2y = p2[1] - (p3[1] - p1[1]) / 6 * tension;

//   return [
//       [cp1x, cp1y],
//       [cp2x, cp2y]
//   ];
// }

// function generateBezierCurves(points) {
//   const curves = [];

//   for (let i = 0; i < points.length - 1; i++) {
//       const p0 = points[i - 1] || points[i];
//       const p1 = points[i];
//       const p2 = points[i + 1] || points[i];
//       const p3 = points[i + 2] || points[i + 1] || points[i];

//       const [cp1, cp2] = catmullRomToBezier(p0, p1, p2, p3);

//       curves.push({
//           start: p1,
//           end: p2,
//           controlPoint1: cp1,
//           controlPoint2: cp2
//       });
//   }

//   return curves;
// }
