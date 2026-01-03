import { useMeetingStore } from "../../store/meetingStore";

export function MeetingRequests() {
  const { requests, respond } = useMeetingStore();

  return (
    <div className="space-y-3">
      <h3 className="font-bold">Meeting Requests</h3>

      {requests.map((r) => (
        <div key={r.id} className="border p-3 rounded">
          <p>{r.title}</p>
          <p className="text-sm">{r.start} → {r.end}</p>

          {r.status === "pending" && (
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => respond(r.id, "accepted")}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => respond(r.id, "declined")}
              >
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
