import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatISO } from "date-fns";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([...events, { title, start: info.date, allDay: true }]);
    }
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.title === info.event.title
        ? { ...event, start: formatISO(info.event.start) }
        : event
    );
    setEvents(updatedEvents);
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
          dayCellClassNames={(info) =>
            info.date.getDay() === 0 ? "bg-red-100 text-red-500" : ""
          }
        />
      </main>
    </div>
  );
};

export default Calendar;
