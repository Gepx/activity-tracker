import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    options: "To-Do",
    title: "",
    deadlineDate: "",
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get-tasks/${id}`
        );
        if (response.status === 200) {
          const taskData = response.data.task;
          setFormData(() => ({
            options: taskData.options || "",
            title: taskData.title || "",
            deadlineDate: taskData.deadlineDate
              ? new Date(taskData.deadlineDate).toISOString().slice(0, 16)
              : "",
            desc: taskData.desc || "",
          }));
          console.log({ message: "Task fetched successfully", response });
          setIsLoading(false);
        }
      } catch (error) {
        console.log({ message: "Error fetching task", error });
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/update-tasks/${id}`,
        formData
      );
      if (response.status === 200) {
        console.log({ message: "Task updated successfully", response });
        navigate("/success-login/projects");
      }
    } catch (error) {
      console.error({ message: "Error updating task", error });
      alert("Failed to update task. Please try again.");
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="m-6 font-poppins max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="text-xl text-gray-700 hover:text-gray-900"
          onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-xl font-semibold">Edit Task</h1>
        <div className="w-6"></div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="options" className="text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="options"
              id="options"
              value={formData.options}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task title"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="deadlineDate" className="text-sm font-medium mb-1">
              Deadline Date
            </label>
            <input
              type="datetime-local"
              name="deadlineDate"
              id="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="desc" className="text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="4"
              value={formData.desc}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task description"></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
