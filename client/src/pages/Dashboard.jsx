import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faCalendarAlt,
  faUserClock,
  faEnvelope,
  faSearch,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import ReactECharts from "echarts-for-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import profileImage from "../assets/img/pooh.gif";
import axios from "axios";
import RangePickerModal from "./RangePickerModal";

const Dashboard = () => {
  const {theme} = useTheme()

  const [selected, setSelected] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const [chartRange, setChartRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 6)),
  });
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [tempRange, setTempRange] = useState(null);

  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const countActivities = (tasks, events, datesInRange) => {
    const counts = {};

    // Initialize counts
    datesInRange.forEach((date) => {
      const key = date.toISOString().split("T")[0];
      counts[key] = 0;
    });

    // Count tasks
    tasks.forEach((task) => {
      try {
        const taskDate = new Date(task.deadlineDate);
        if (!isNaN(taskDate)) {
          const isoDate = taskDate.toISOString().split("T")[0];
          if (counts[isoDate] !== undefined) counts[isoDate]++;
        }
      } catch (e) {
        console.warn("Invalid task date:", task.deadlineDate);
      }
    });

    // Count events
    events.forEach((event) => {
      try {
        const eventDate = new Date(event.startTime);
        if (!isNaN(eventDate)) {
          const isoDate = eventDate.toISOString().split("T")[0];
          if (counts[isoDate] !== undefined) counts[isoDate]++;
        }
      } catch (e) {
        console.warn("Invalid event date:", event.startTime);
      }
    });

    return counts;
  };

  const chartOptions = (activityCounts, datesInRange) => {
    const activityLevels = ["Terrible", "Bad", "Normal", "Great", "Amazing"];
    return {
      grid: {
        left: "0.9%", // Remove left gap
        right: "0.99%", // Remove right gap
        top: "10%",
        bottom: "10%",
        containLabel: true, // Ensure labels are inside the chart
      },
      xAxis: {
        type: "category",
        data: datesInRange.map((d) => d.getDate().toString()),
        boundaryGap: false, // Ensures line touches edges
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: "category", // Change from value to category
        data: activityLevels,
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
          const day = params[0].name;
          const date = datesInRange.find((d) => d.getDate().toString() === day);
          const count = activityCounts[date.toISOString().split("T")[0]] || 0;
          const activityLevel =
            activityLevels[Math.min(Math.floor(count / 2), 4)];
          return `
            ${date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}<br/>
            <strong>${count} activities (${activityLevel})</strong>
          `;
        },
      },
      series: [
        {
          data: datesInRange.map((date) => {
            const count = activityCounts[date.toISOString().split("T")[0]] || 0;
            return Math.min(Math.floor(count / 2), 4);
          }), // Map values to mood levels
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskResponse = await axios.get(
        "http://localhost:3000/api/get-tasks"
      );

      const formatTask = taskResponse.data.map((task) => ({
        id: task._id,
        options: task.options,
        title: task.title,
        deadlineDate: new Date(task.deadlineDate),
        date: new Date(task.deadlineDate).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        time: new Date(task.deadlineDate).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        desc: task.desc,
      }));

      const eventResponse = await axios.get("http://localhost:3000/api/events");
      console.log(eventResponse.data);

      const formatEvent = eventResponse.data.map((event) => ({
        id: event._id,
        title: event.title,
        startTimeDate: new Date(event.startTime),
        date: new Date(event.startTime).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        startTime: new Date(event.startTime).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: event.endTime
          ? new Date(event.endTime).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
        reminderTime: event.reminderTime,
      }));

      setTasks(formatTask);
      setEvents(formatEvent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={`h-screen flex overflow-hidden font-poppins ${theme === "dark" ? "bg-gray-900 text-gray-100" : null}`}>
      {/* Main Content */}
      <main className={`flex-1 border-r-2 ${theme === "dark" ? "border-gray-500" : "border-gray-200"} px-6 py-6`}>
        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search something..."
            className={`w-64 pl-4 pr-10 py-2 text-xs rounded-xl border-none ${theme === "dark" ? "bg-black text-gray-100 focus:ring-gray-700" : "bg-gray-200 text-gray-700 focus:ring-gray-400"} focus:outline-none focus:ring-2 font-poppins`}
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
            <div
              className={`flex items-center gap-2 px-3 py-1 border rounded-lg ${theme === "dark" ? "text-gray-100 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"} cursor-pointer`}
              onClick={() => setShowRangePicker(true)}>
              <FontAwesomeIcon icon={faCalendarAlt} className="text-sm" />
              <span className="text-sm">
                {chartRange.from.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}{" "}
                -{" "}
                {chartRange.to.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            {showRangePicker && (
              <RangePickerModal
                tempRange={tempRange}
                chartRange={chartRange}
                setTempRange={setTempRange}
                setChartRange={setChartRange}
                setShowRangePicker={setShowRangePicker}
              />
            )}
          </div>
          <div className="w-full">
            {chartRange.from && chartRange.to && (
              <ReactECharts
                option={chartOptions(
                  countActivities(
                    tasks,
                    events,
                    getDatesInRange(chartRange.from, chartRange.to)
                  ),
                  getDatesInRange(chartRange.from, chartRange.to)
                )}
              />
            )}
          </div>
        </div>

        {/* Tasks & Goals*/}
        <div className="flex flex-row gap-4">
          {/* Tasks */}
          {tasks.length > 0 ? (
            tasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`w-1/2 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-md rounded-lg px-4 py-2`}>
                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">●</span>
                    <p className="text-sm font-bold text-yellow-500">
                      {task.options}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className={`w-5 h-5 ${theme === "dark" ? null : "border-gray-400"} rounded-full focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                  />
                </div>

                {/* Task Title */}
                <h4 className={`text-sm font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
                  {task.title}
                </h4>

                {/* Description (Truncated if long) */}
                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm mt-2 truncate w-[250px]`}>
                  {task.desc}
                </p>

                {/* Date + View Task */}
                <div className={`flex justify-between items-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm mt-3`}>
                  {/* Date */}
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="text-[10px]"
                    />
                    <span className="text-[10px]">{task.date}</span>{" "}
                    <FontAwesomeIcon icon={faClock} className="text-[10px]" />
                    <span className="text-[10px]">{task.time}</span>
                  </div>

                  {/* View Task */}
                  <Link
                    to={`/success-login/calendar`}
                    className="text-blue-500 font-semibold flex items-center gap-1 hover:underline">
                    View <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No Task.</p>
          )}
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
          <button className={`${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}>
            <FontAwesomeIcon icon={faEnvelope} className="btn text-gray-100" />
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
              today: theme === "dark" ? "text-white font-bold" : "text-gray-900 font-bold",
            }}
            classNames={{
              caption: "text-gray-700 font-medium",
              head_cell: "text-gray-500",
              day: theme === "dark" ? "w-8 h-8 text-gray-400" : "w-8 h-8 text-gray-700",
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
            <button className={`text-xs ${theme === "dark" ? "text-gray-100 hover:text-gray-400" : "text-neutral-500 hover:text-black"} font-semibold transition cursor-pointer`}>
              View All
            </button>
          </div>

          {/* Events List */}
          <div className="mt-4 space-y-4">
            {/* Event Card */}
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className={"flex items-center gap-4 p-2 rounded-2xl shadow-md border border-gray-200 hover:bg-gray-100 transition cursor-pointer"}>
                  {/* Event Icon */}
                  <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>

                  {/* Event Details */}
                  <div>
                    <h4 className="text-sm font-semibold">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <p>{event.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FontAwesomeIcon icon={faUserClock} />
                      <p>
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-sm ${theme === "dark" ? "text-gray-100" : "text-gray-500"}`}>No upcoming events.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
