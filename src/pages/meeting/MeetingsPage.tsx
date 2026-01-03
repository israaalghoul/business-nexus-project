import { CalendarView } from "./CalendarView";
import { SendMeetingRequest } from "./SendMeetingRequest";
import { MeetingRequests } from "./MeetingRequests";

export function MeetingsPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2">
        <CalendarView />
      </div>
      <div className="space-y-4">
        <SendMeetingRequest />
        <MeetingRequests />
      </div>
    </div>
  );
}
