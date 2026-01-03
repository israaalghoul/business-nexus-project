import { create } from "zustand";
import { AvailabilitySlot, MeetingRequest, Meeting } from "../types/meeting";

type State = {
  availability: AvailabilitySlot[];
  requests: MeetingRequest[];
  meetings: Meeting[];

  addAvailability: (slot: AvailabilitySlot) => void;
  updateAvailability: (slot: AvailabilitySlot) => void;

  sendRequest: (req: MeetingRequest) => void;
  respond: (id: string, status: "accepted" | "declined") => void;
};

export const useMeetingStore = create<State>((set) => ({
  availability: [],
  requests: [],
  meetings: [],

  addAvailability: (slot) =>
    set((s) => ({ availability: [...s.availability, slot] })),

  updateAvailability: (slot) =>
    set((s) => ({
      availability: s.availability.map((a) =>
        a.id === slot.id ? slot : a
      ),
    })),

  sendRequest: (req) =>
    set((s) => ({ requests: [...s.requests, req] })),

  respond: (id, status) =>
    set((s) => {
      const req = s.requests.find((r) => r.id === id);
      if (!req) return s;

      return {
        requests: s.requests.map((r) =>
          r.id === id ? { ...r, status } : r
        ),
        meetings:
          status === "accepted"
            ? [
                ...s.meetings,
                {
                  id: req.id,
                  title: req.title,
                  start: req.start,
                  end: req.end,
                },
              ]
            : s.meetings,
      };
    }),
}));
