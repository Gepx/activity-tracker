import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { formatISO, parseISO } from "date-fns";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events");
      const convertedEvents = response.data.map((event) => ({
        ...event,
        id: event._id,
        start: parseISO(event.startTime),
        end: event.endTime ? parseISO(event.endTime) : null,
      }));
      setEvents(convertedEvents);
    } catch (error) {
      console.log("Error fetching events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = async () => {
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
          startTime: startTime ? formatISO(new Date(startTime)) : null,
          endTime: endTime ? formatISO(new Date(endTime), 7) : null,
          reminderTime: reminderTime
            ? formatISO(new Date(reminderTime), 7)
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
      const eventId = info.event.id;

      if (!eventId) {
        console.error("Error: Event ID is missing!");
        return;
      }

      const newStartTime = info.event.start.toISOString();

      const droppedEvent = events.find((e) => e.id === eventId);
      let newEndTime = null;

      if (droppedEvent?.end) {
        const originalDuration =
          new Date(droppedEvent.end).getTime() -
          new Date(droppedEvent.start).getTime();
        newEndTime = new Date(
          new Date(newStartTime).getTime() + originalDuration
        ).toISOString();
      }

      console.log("Updating event:", { eventId, newStartTime, newEndTime });

      await axios.put(`http://localhost:3000/api/events/${eventId}`, {
        startTime: newStartTime,
        endTime: newEndTime,
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
          timeZone="Asia/Jakarta"
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
