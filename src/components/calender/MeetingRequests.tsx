import { useMeetingStore } from "../../store/meetingStore";

export default function MeetingRequests() {
  const { requests, respond } = useMeetingStore();

  return (
    <div className="space-y-3">
      <h2 className="font-bold">Meeting Requests</h2>

      {requests.map((r) => (
        <div key={r.id} className="border p-3 rounded">
          <p className="font-semibold">{r.title}</p>
          <p className="text-sm">
            {r.start} → {r.end}
          </p>

          {r.status === "pending" && (
            <div className="flex gap-2 mt-2">
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

          {r.status !== "pending" && (
            <span className="text-sm italic">{r.status}</span>
          )}
        </div>
      ))}
    </div>
  );
}
