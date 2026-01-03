import { useState } from "react";
import { useMeetingStore } from "../../store/meetingStore";
import { v4 as uuid } from "uuid";

export default function SendMeetingRequest() {
  const sendRequest = useMeetingStore((s) => s.sendRequest);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="p-4 border rounded space-y-2">
      <h2 className="font-bold">Request Meeting</h2>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="datetime-local"
        className="border p-2 w-full"
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="datetime-local"
        className="border p-2 w-full"
        onChange={(e) => setEnd(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          sendRequest({
            id: uuid(),
            title,
            start,
            end,
            senderRole: "entrepreneur",
            status: "pending",
          })
        }
      >
        Send Request
      </button>
    </div>
  );
}
