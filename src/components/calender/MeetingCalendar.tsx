import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useMeetingStore } from "../../store/meetingStore";
import { v4 as uuid } from "uuid";

export default function MeetingCalendar() {
  const {
    availability,
    meetings,
    addAvailability,
    updateAvailability,
  } = useMeetingStore();

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable
        editable
        height="auto"

        events={[
          // Availability (background)
          ...availability.map((a) => ({
            id: a.id,
            start: a.start,
            end: a.end,
            display: "background",
            backgroundColor: "#DCFCE7",
          })),

          // Confirmed meetings
          ...meetings.map((m) => ({
            ...m,
            backgroundColor: "#3B82F6",
          })),
        ]}

        // ADD availability
        select={(info) => {
          addAvailability({
            id: uuid(),
            start: info.startStr,
            end: info.endStr,
          });
        }}

        // MODIFY availability (resize)
        eventResize={(info) => {
          updateAvailability({
            id: info.event.id,
            start: info.event.startStr!,
            end: info.event.endStr!,
          });
        }}

        // MODIFY availability (drag)
        eventDrop={(info) => {
          updateAvailability({
            id: info.event.id,
            start: info.event.startStr!,
            end: info.event.endStr!,
          });
        }}
      />
    </div>
  );
}
