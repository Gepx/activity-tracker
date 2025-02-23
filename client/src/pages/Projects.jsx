import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendarDays,
  faCaretDown,
  faClock,
  faPen,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import profileImage from "../assets/img/pooh.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const [sections, setSections] = useState([]);

  const navigate = useNavigate();

  function handleAddTask() {
    navigate("/add-task");
  }

  // const sections = [
  //   {
  //     title: "To-Do",
  //     count: 4,
  //     tasks: [
  //       {
  //         title: "Attendance Apps",
  //         date: "Oct 3, 2020",
  //         description: "Employee can confirm the attendance online.",
  //         createdDate: "12 Feb 2025",
  //         createdTime: "17:00",
  //       },
  //       {
  //         title: "UI Food Apps",
  //         date: "3 days left",
  //         description: "No need to go to restaurant anymore, take it easy.",
  //         createdDate: "11 Feb 2025",
  //         createdTime: "14:00",
  //       },
  //       {
  //         title: "Money Manager",
  //         date: "Oct 27, 2020",
  //         description: "Manage your money wisely, so you can be rich quickly.",
  //         createdDate: "10 Feb 2025",
  //         createdTime: "12:00",
  //       },
  //     ],
  //   },
  //   {
  //     title: "In Progress",
  //     count: 2,
  //     tasks: [
  //       {
  //         title: "Thrifting Apps",
  //         date: "1 day left",
  //         description: "Buy thrift things and any secondhand in apps.",
  //         createdDate: "10 Feb 2025",
  //         createdTime: "12:00",
  //       },
  //       {
  //         title: "Task Manager",
  //         date: "Oct 28, 2020",
  //         description:
  //           "Manage your time to do your tasks, finish it one by one.",
  //         createdDate: "10 Feb 2025",
  //         createdTime: "12:00",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Review",
  //     count: 10,
  //     tasks: [
  //       {
  //         title: "Marketplace Apps",
  //         date: "1 day left",
  //         description: "Shopping from home, only scrolling your phone.",
  //         createdDate: "10 Feb 2025",
  //         createdTime: "12:00",
  //       },
  //       {
  //         title: "Cashier Apps",
  //         date: "Oct 20, 2020",
  //         description: "Take the restaurant payment easily.",
  //         createdDate: "10 Feb 2025",
  //         createdTime: "12:00",
  //       },
  //     ],
  //   },
  // ];

  const calculateDaysLeft = (deadlineDate) => {
    if (!deadlineDate) return "No deadline"; // Handle tasks without a deadline

    const today = new Date();
    const deadline = new Date(deadlineDate);

    const timeDiff = deadline - today; // Difference in milliseconds
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

    if (daysLeft < 0) return "Past due"; // If the deadline has passed
    if (daysLeft === 0) return "Due today";
    if (daysLeft === 1) return "1 day left";
    return `${daysLeft} days left`;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-tasks");

        if (response.status === 200) {
          console.log({ message: "Tasks fetched successfully", response });
          const groupedTasks = response.data.reduce((acc, task) => {
            const daysLeft = calculateDaysLeft(task.deadlineDate);
            if (!acc[task.options]) {
              acc[task.options] = {
                option: task.options,
                count: 0,
                tasks: [],
              };
            }
            acc[task.options].tasks.push({ ...task, daysLeft });
            acc[task.options].count++;
            return acc;
          }, {});

          // Convert grouped tasks object into an array
          setSections(Object.values(groupedTasks));
          // setSections(response.data);
        }
      } catch (error) {
        console.log({ message: "Failed to fetch: ", error });
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden font-poppins">
      <main className="flex-1 px-6 py-6 overflow-auto no-scrollbar">
        {/* Top Section Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
            <p className="text-xs font-light text-gray-500">
              Set your work on note and you won't forget it.
            </p>
          </div>
          <div className="flex items-center gap-5   ">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search something..."
                className="w-58 pl-8 pr-10 py-2 text-xs rounded-xl bg-gray-200 border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 font-poppins"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-52 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
            <FontAwesomeIcon icon={faBell} className="text-gray-500 text-lg" />
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2"
            />
          </div>
        </div>

        {/* Project Tags */}
        <div className="flex items-center mt-6 gap-3">
          <div className="flex items-center gap-1">
            <span className="text-blue-500 text-[10px]">●</span>
            <p className="text-[10px] font-bold text-gray-800">To-Do</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-[10px]">●</span>
            <p className="text-[10px] font-bold text-gray-800">In Progress</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500 text-[10px]">●</span>
            <p className="text-[10px] font-bold text-gray-800">Complete</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-pink-500 text-[10px]">●</span>
            <p className="text-[10px] font-bold text-gray-800">Close to due</p>
          </div>
          <div className="flex items-center justify-center gap-1 bg-blue-400 rounded-md w-24 h-8 cursor-pointer transition-all hover:bg-blue-500">
            <button className="cursor-pointer" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List Categories */}
        <div className="flex gap-6 mt-6">
          {sections.map((section, index) => (
            <div key={index} className="w-[300px] min-w-[300px]">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-md font-semibold">{section.option}</h2>
                <span className="text-xs text-gray-500">
                  ({section.tasks.length})
                </span>
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </div>

              {/* Task Cards */}
              <div className="grid gap-4">
                {section.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-[300px] h-[159px]">
                    {/* Title and Menu */}
                    <div className="relative flex justify-between items-center">
                      <h3 className="text-md font-medium">{task.title}</h3>
                      <div>
                        <button
                          className="relative text-gray-500 cursor-pointer"
                          onClick={() =>
                            setMenuOpen(menuOpen === idx ? null : idx)
                          }>
                          ...
                        </button>
                        {/* Dropdown Menu */}
                        {menuOpen === idx && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 shadow-lg rounded-md w-28 text-sm">
                            <button
                              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => console.log("Edit clicked")}>
                              <FontAwesomeIcon icon={faPen} /> Edit
                            </button>
                            <button
                              className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                              onClick={() => console.log("Delete clicked")}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Date Badge */}
                    {/* <span
                    className={`px-2 py-1 text-xs font-medium rounded-lg inline-block ${
                      section.date.includes("left")
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                    {section.date}
                  </span> */}

                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-lg inline-block ${
                        task.daysLeft === "Due today" ||
                        task.daysLeft === "1 day left"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                      {task.daysLeft}
                    </span>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-2">{task.desc}</p>

                    {/* Footer */}

                    {/* Progress & Comments */}
                    <div className="items-end">
                      <div className="flex items-center  mt-3 gap-3 text-gray-500 text-xs">
                        <span>
                          <FontAwesomeIcon icon={faCalendarDays} />{" "}
                          {task.createdAt}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faClock} /> {task.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
