import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    options: "To-Do",
    title: "",
    deadlineDate: "",
    desc: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-task",
        formData
      );
      if (response.status === 201) {
        console.log({ message: "Task created successfully", response });
        navigate("/success-login/projects");
      }
    } catch (error) {
      console.log({ message: "Error creating task", error });
    }
  };

  return (
    <div className="m-6 font-poppins max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="text-xl text-gray-700 hover:text-gray-900"
          onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-xl font-semibold">Add Task</h1>
        <div className="w-6"></div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
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
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
