import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { formatISO, addHours, parseISO } from "date-fns";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Convert UTC time to UTC+7
  const toUTC7 = (date) => addHours(parseISO(date), 7);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events");
      const convertedEvents = response.data.map((event) => ({
        ...event,
        id: event._id,
        start: toUTC7(event.startTime),
        end: event.endTime ? toUTC7(event.endTime) : null,
      }));
      setEvents(convertedEvents);
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
      const startTime = prompt("Enter start time (YYYY-MM-DDTHH:MM):");
      const endTime = prompt("Enter end time (YYYY-MM-DDTHH:MM, optional):");
      const reminderTime = prompt(
        "Reminder time? (YYYY-MM-DDTHH:MM, optional):"
      );

      try {
        const newEvent = {
          title,
          startTime: startTime
            ? formatISO(addHours(new Date(startTime), -7))
            : null,
          endTime: endTime ? formatISO(addHours(new Date(endTime), -7)) : null,
          reminderTime: reminderTime
            ? formatISO(addHours(new Date(reminderTime), -7))
            : null,
        };

        await axios.post("http://localhost:3000/api/events", newEvent);
        fetchEvents(); // Refresh the calendar
      } catch (error) {
        console.log("Error adding event", error);
      }
    }
  };

  const handleEventDrop = async (info) => {
    try {
      const newStartTime = formatISO(addHours(info.event.start, -7));

      await axios.put(`http://localhost:3000/api/events/${info.event.id}`, {
        startTime: newStartTime,
      });

      fetchEvents(); // Refresh the calendar
    } catch (error) {
      console.log("Error updating event", error);
    }
  };

  const handleDeleteEvent = async (info) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventId = info.event.id;
      console.log("Deleting event with ID: ", eventId);
      console.log("Event object: ", info.event);

      if (!eventId) {
        console.log("Error: Event ID is undefined.");
        return;
      }

      try {
        await axios.delete(`http://localhost:3000/api/events/${eventId}`);
        fetchEvents(); // Refresh the calendar
      } catch (error) {
        console.log("Error deleting event", error);
      }
    }
  };

  return (
    <div className="h-screen font-poppins overflow-hidden">
      <main className="flex-1 px-6 py-6 border-gray-200 overflow-auto no-scrollbar">
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
          eventDrop={handleEventDrop}
          aspectRatio={1.9}
          handleWindowResize={true}
          eventColor="#4F46E5"
          eventClick={handleDeleteEvent}
        />
      </main>
    </div>
  );
};

export default Calendar;
