import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatISO } from "date-fns";
import axios from "axios";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.log("Error fetching events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = async (info) => {
    const title = prompt("Enter event title:");
    if (title) {
      const startTime = prompt(
        "Enter start time (optional, format: YYYY-MM-DDTHH:MM):"
      );
      const endTime = prompt(
        "Enter end time (optional, format: YYYY-MM-DDTHH:MM):"
      );
      const reminderTime = prompt(
        "Need a reminder time? (optional, format: YYYY-MM-DDTHH:MM):"
      );
      try {
        const response = await axios.post("http://localhost:3000/api/events", {
          title,
          startTime: startTime
            ? new Date(startTime).toLocaleString("id-ID")
            : null,
          endTime: endTime ? new Date(endTime).toLocaleString("id-ID") : null,
          reminderTime: reminderTime
            ? new Date(reminderTime).toLocaleString("id-ID")
            : null,
        });
        setEvents([...events, response.data]);

        fetchEvents();
      } catch (error) {
        console.log("Error adding event", error);
      }
    }
  };

  const handleEventDrop = async (info) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/events/${info.event.id}`,
        { startTime: formatISO(info.event.start) }
      );
      const updatedEvents = events.map((event) =>
        event._id === info.event.id ? response.data : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.log("Error updating event", error);
    }
  };

  const handleDeleteEvent = async (info) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${info.event.id}`);
      const deletedEvents = events.filter(
        (event) => event._id !== info.event.id
      );
      setEvents(deletedEvents);
      fetchEvents();
    } catch (error) {
      console.log("Error deleting event", error);
    }
  };

  return (
    <div className="h-screen font-poppins overflow-hidden">
      <main className="flex-1 px-6 py-6 border-gray-200 overflow-auto no-scrollbar">
        {/* <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          <p className="text-xs font-light text-gray-500">
            Set your schedule easily and you won't forget it.
          </p>
        </div> */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dateClick={handleDateClick}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          aspectRatio={1.9}
          handleWindowResize={true}
          eventColor="#4F46E5"
          eventClick={(info) => {
            if (window.confirm("Are you sure you want to delete this event?")) {
              handleDeleteEvent(info);
            }
          }}
        />
      </main>
    </div>
  );
};

export default Calendar;
