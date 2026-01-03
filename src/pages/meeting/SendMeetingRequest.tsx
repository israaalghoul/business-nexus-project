import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useMeetingStore } from "../../store/meetingStore";

export function SendMeetingRequest() {
  const sendRequest = useMeetingStore((s) => s.sendRequest);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="border p-4 rounded space-y-2">
      <h3 className="font-bold">Request Meeting</h3>

      <input
        className="border p-2 w-full"
        placeholder="Title"
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
        Send
      </button>
    </div>
  );
}
