import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import { useMeetingStore } from "../../store/meetingStore";

export function CalendarView() {
  const {
    availability,
    meetings,
    addAvailability,
    updateAvailability,
  } = useMeetingStore();

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable
      editable
      height="auto"
      events={[
        ...availability.map((a) => ({
          id: a.id,
          start: a.start,
          end: a.end,
          display: "background",
        })),
        ...meetings,
      ]}
      select={(info) =>
        addAvailability({
          id: uuid(),
          start: info.startStr,
          end: info.endStr,
        })
      }
      eventResize={(info) =>
        updateAvailability({
          id: info.event.id,
          start: info.event.startStr!,
          end: info.event.endStr!,
        })
      }
      eventDrop={(info) =>
        updateAvailability({
          id: info.event.id,
          start: info.event.startStr!,
          end: info.event.endStr!,
        })
      }
    />
  );
}
