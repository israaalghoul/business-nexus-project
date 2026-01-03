export type AvailabilitySlot = {
  id: string;
  start: string;
  end: string;
};

export type MeetingRequest = {
  id: string;
  title: string;
  start: string;
  end: string;
  senderRole: "entrepreneur" | "investor";
  status: "pending" | "accepted" | "declined";
};

export type Meeting = {
  id: string;
  title: string;
  start: string;
  end: string;
};
