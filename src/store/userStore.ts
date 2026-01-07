import { create } from "zustand";
import type { UserRole } from "../types/index";


interface User {
  id: string;
  role: UserRole;
}

interface UserState {
  user: User;
  switchRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "investor-1",
    role: "investor",
  },

  switchRole: (role) =>
    set({
      user: {
        id: role === "investor" ? "investor-1" : "entrepreneur-1",
        role,
      },
    }),
}));
