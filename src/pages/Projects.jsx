import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import profileImage from "../assets/img/pooh.gif";

const Projects = () => {
  const sections = [
    {
      title: "To-Do",
      count: 4,
      tasks: [
        {
          title: "Attendance Apps",
          date: "Oct 3, 2020",
          description: "Employee can confirm the attendance online.",
          users: ["👤", "👤", "👤"],
          progress: "2/5",
          comments: 4,
        },
        {
          title: "UI Food Apps",
          date: "3 days left",
          description: "No need to go to restaurant anymore, take it easy.",
          users: ["👤"],
          progress: "11/12",
          comments: 20,
        },
        {
          title: "Money Manager",
          date: "Oct 27, 2020",
          description: "Manage your money wisely, so you can be rich quickly.",
          users: ["👤", "👤"],
          progress: "0/10",
          comments: 0,
        },
      ],
    },
    {
      title: "In Progress",
      count: 2,
      tasks: [
        {
          title: "Thrifting Apps",
          date: "1 day left",
          description: "Buy thrift things and any secondhand in apps.",
          users: ["👤", "👤", "👤"],
          progress: "4/5",
          comments: 16,
        },
        {
          title: "Task Manager",
          date: "Oct 28, 2020",
          description:
            "Manage your time to do your tasks, finish it one by one.",
          users: ["👤", "👤", "👤"],
          progress: "9/16",
          comments: 11,
        },
      ],
    },
    {
      title: "Review",
      count: 10,
      tasks: [
        {
          title: "Marketplace Apps",
          date: "1 day left",
          description: "Shopping from home, only scrolling your phone.",
          users: ["👤", "👤"],
          progress: "6/7",
          comments: 12,
        },
        {
          title: "Cashier Apps",
          date: "Oct 20, 2020",
          description: "Take the restaurant payment easily.",
          users: ["👤", "👤"],
          progress: "5/10",
          comments: 6,
        },
      ],
    },
  ];
  return (
    <div className="h-screen flex overflow-hidden font-poppins">
      <main className="flex-1 px-6 py-6">
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
        </div>

        {/* <div className="flex items-center gap-3">
          <div className="flex items-center flex-col gap-1 flex-start">
            <div className="flex items-center gap-1">
              <h1>To-Do</h1>
              <span>(4)</span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3>Attendance Apps</h3>
                <span>...</span>
              </div>
              <p>Feb 20, 2025</p>
              <p>Employee can confirm the attendance online.</p>
              <div>
                <p>17 Feb 2025</p>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex gap-6 p-6 overflow-x-auto">
          {sections.map((section, index) => (
            <div key={index} className="w-[320px] min-w-[320px]">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <span className="text-gray-500">({section.count})</span>
              </div>

              {/* Task Cards */}
              <div className="grid gap-4">
                {section.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    {/* Title and Menu */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">{task.title}</h3>
                      <button className="text-gray-500">⋮</button>
                    </div>

                    {/* Date Badge */}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-lg inline-block ${
                        task.date.includes("left")
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                      {task.date}
                    </span>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-2">
                      {task.description}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4">
                      {/* Avatars */}
                      <div className="flex -space-x-2">
                        {task.users.map((user, idx) => (
                          <span
                            key={idx}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-xs">
                            {user}
                          </span>
                        ))}
                      </div>

                      {/* Progress & Comments */}
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <span>📑 {task.progress}</span>
                        <span>💬 {task.comments}</span>
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
