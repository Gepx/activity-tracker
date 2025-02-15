import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ReactECharts from "echarts-for-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const activityLevels = ["Terrible", "Bad", "Normal", "Great", "Amazing"];

  const chartOptions = {
    grid: {
      left: "0.9%", // Remove left gap
      right: "0.99%", // Remove right gap
      top: "10%",
      bottom: "10%",
      containLabel: true, // Ensure labels are inside the chart
    },
    xAxis: {
      type: "category",
      data: ["8", "9", "10", "11", "12", "13", "14"],
      boundaryGap: false, // Ensures line touches edges
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category", // Change from value to category
      data: activityLevels, // Reverse order to match UI
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed", color: "#E0E0E0" },
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const date = `June ${params[0].name}, 2022`;
        const activity = activityLevels[params[0].value];
        return `${date}<br /><strong>${activity} activity</strong>`;
      },
    },
    series: [
      {
        data: [1, 4, 3, 3, 2, 2, 4], // Map values to mood levels
        type: "line",
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color: "#FF6B8B", // Light pink
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255, 107, 139, 0.5)" },
              { offset: 1, color: "rgba(255, 107, 139, 0)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="h-screen flex">
      {/* Main Content */}
      <main className="flex-1 border-r-2 border-gray-200 px-6 py-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search something..."
            className="w-64 pl-4 pr-10 py-2 text-xs rounded-xl bg-gray-200 border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 font-poppins"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-35 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Activity Chart */}
        <div className="py-6">
          <div className="flex flex-row items-center justify-between mb-0">
            <h3 className="text-lg font-bold">Activity Chart</h3>
            <p>Hello</p>
          </div>
          <div className="w-full">
            <ReactECharts
              option={chartOptions}
              // style={{ width: "600px", height: "240px" }}
            />
          </div>
        </div>

        {/* Tasks & Goals*/}
        <div className="flex flex-row gap-4">
          {/* Tasks */}
          <div className="w-1/2 bg-white shadow-md rounded-lg px-4 py-2">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-lg">●</span>
              <p className="text-sm font-bold text-yellow-500">In Progress</p>

              <input
                type="checkbox"
                className="w-5 h-5 border-gray-400 rounded-full focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Task Title */}
            <h4 className="text-sm font-semibold text-gray-800">
              Website Development Project - Activity Tracking
            </h4>

            {/* Description (Truncated if long) */}
            <p className="text-gray-600 text-sm mt-2 truncate w-[250px]">
              Tracking team activities and monitoring daily progress to ensure
              project completion...
            </p>

            {/* Date + View Task */}
            <div className="flex justify-between items-center text-gray-500 text-sm mt-3">
              {/* Date */}
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendar} />
                <span>Nov 10</span>
              </div>

              {/* View Task */}
              <Link
                to="/tasks"
                className="text-blue-500 font-semibold flex items-center gap-1 hover:underline">
                View <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>

          {/* Goals */}
          <div className="w-1/2 bg-white shadow-md rounded-lg px-4 py-2">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-lg">●</span>
              <p className="text-sm font-bold text-yellow-500">In Progress</p>

              <input
                type="checkbox"
                className="w-5 h-5 border-gray-400 rounded-full focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Task Title */}
            <h4 className="text-sm font-semibold text-gray-800">
              Website Development Project - Activity Tracking
            </h4>

            {/* Description (Truncated if long) */}
            <p className="text-gray-600 text-sm mt-2 truncate w-[250px]">
              Tracking team activities and monitoring daily progress to ensure
              project completion...
            </p>

            {/* Date + View Task */}
            <div className="flex justify-between items-center text-gray-500 text-sm mt-3">
              {/* Date */}
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faCalendar} />
                <span>Nov 10</span>
              </div>

              {/* View Task */}
              <Link
                to="/tasks"
                className="text-blue-500 font-semibold flex items-center gap-1 hover:underline">
                View <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Side for calender and profile */}
      <aside className="w-[300px] px-6 py-6">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-lg font-semibold">User</h2>
        </div>
        <div className="mt-6">
          <Calendar onChange={setDate} value={date} className="w-full" />
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
