import { useMeetingStore } from "../../store/meetingStore";

export default function ConfirmedMeetings() {
  const meetings = useMeetingStore((s) => s.meetings);

  return (
    <div className="space-y-3">
      {meetings.map((m) => (
        <div key={m.id} className="p-3 border rounded">
          <h3 className="font-bold">{m.title}</h3>
          <p>{m.start} → {m.end}</p>
        </div>
      ))}
    </div>
  );
}
