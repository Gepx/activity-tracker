import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faCalendarAlt,
  faUserClock,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ReactECharts from "echarts-for-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import profileImage from "../assets/img/pooh.gif";

const Dashboard = () => {
  const [selected, setSelected] = useState(new Date());

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
    <div className="h-screen flex overflow-hidden font-poppins">
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
            <div className="flex items-center gap-2 px-3 py-1 border rounded-lg text-gray-700">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-sm" />
              <span className="text-sm">Jun 08 - Jun 14</span>
            </div>
          </div>
          <div className="w-full">
            <ReactECharts option={chartOptions} />
          </div>
        </div>

        {/* Tasks & Goals*/}
        <div className="flex flex-row gap-4">
          {/* Tasks */}
          <div className="w-1/2 bg-white shadow-md rounded-lg px-4 py-2">
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">●</span>
                <p className="text-sm font-bold text-yellow-500">In Progress</p>
              </div>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">●</span>
                <p className="text-sm font-bold text-yellow-500">In Progress</p>
              </div>
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
      <aside className="w-[320px] px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2"
            />
            <h2 className="text-sm font-semibold">Egip Sinargo</h2>
          </div>
          <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300">
            <FontAwesomeIcon icon={faEnvelope} className="btn" />
          </button>
        </div>
        <div className="mt-6">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            showOutsideDays
            className="w-[300px] text-sm"
            modifiersClassNames={{
              selected: "bg-green-500 text-white rounded-full",
              today: "font-bold text-gray-900",
            }}
            classNames={{
              caption: "text-gray-700 font-medium",
              head_cell: "text-gray-500",
              day: "w-8 h-8 text-gray-700",
              nav_button: "text-gray-700",
            }}
            // components={{
            //   IconLeft: () => (
            //     <FontAwesomeIcon icon={faArrowLeft} className="bg-amber-400" />
            //   ),
            //   IconRight: () => <FontAwesomeIcon icon={faArrowRight} />,
            // }}
          />
        </div>

        {/* Events */}
        <div className="mt-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Upcoming Events</h3>
            <button className="text-xs text-neutral-500 font-semibold hover:text-black transition cursor-pointer">
              View All
            </button>
          </div>

          {/* Events List */}
          <div className="mt-4 space-y-4">
            {/* Event Card */}
            <div className="flex items-center gap-4 p-2 rounded-2xl shadow-md border border-gray-200 hover:bg-gray-100 transition cursor-pointer">
              {/* Event Icon */}
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>

              {/* Event Details */}
              <div>
                <h4 className="text-sm font-semibold">Team Meeting</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <p>27 Februari 2025</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faUserClock} />
                  <p>10:00 AM - 11:00 AM</p>
                </div>
              </div>
            </div>

            {/* Another Event */}
            <div className="flex items-center gap-4 p-2 rounded-2xl shadow-md border border-gray-200 hover:bg-gray-100 transition cursor-pointer">
              {/* Event Icon */}
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>

              {/* Event Details */}
              <div>
                <h4 className="text-sm font-semibold">Client Meeting</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <p>27 Februari 2025</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faUserClock} />
                  <p>10:00 AM - 11:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
