import { create } from "zustand";
import { v4 as uuid } from "uuid";
import type { UserRole } from "../types";

export type TransactionStatus = "completed" | "pending" | "failed";
export type TransactionType = "deposit" | "withdraw" | "transfer" | "funding";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  sender: string;
  receiver: string;
  status: TransactionStatus;
  createdAt: string;
}

interface PaymentState {
  wallets: Record<UserRole, number>;
  transactions: Transaction[];

  deposit: (role: UserRole, amount: number) => void;
  withdraw: (role: UserRole, amount: number) => void;
  fundDeal: (
    investorRole: UserRole,
    entrepreneurRole: UserRole,
    amount: number
  ) => boolean;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  wallets: {
    investor: 12_500,
    entrepreneur: 2_000,
  },

  transactions: [],

  deposit: (role, amount) =>
    set((state) => ({
      wallets: {
        ...state.wallets,
        [role]: state.wallets[role] + amount,
      },
      transactions: [
        {
          id: uuid(),
          type: "deposit",
          amount,
          sender: "External Wallet",
          receiver: role,
          status: "completed",
          createdAt: new Date().toLocaleString(),
        },
        ...state.transactions,
      ],
    })),

  withdraw: (role, amount) =>
    set((state) => ({
      wallets: {
        ...state.wallets,
        [role]: state.wallets[role] - amount,
      },
      transactions: [
        {
          id: uuid(),
          type: "withdraw",
          amount,
          sender: role,
          receiver: "External Wallet",
          status: "completed",
          createdAt: new Date().toLocaleString(),
        },
        ...state.transactions,
      ],
    })),

  fundDeal: (investorRole, entrepreneurRole, amount) => {
    const { wallets } = get();

    if (wallets[investorRole] < amount) return false;

    set((state) => ({
      wallets: {
        ...state.wallets,
        [investorRole]: state.wallets[investorRole] - amount,
        [entrepreneurRole]: state.wallets[entrepreneurRole] + amount,
      },
      transactions: [
        {
          id: uuid(),
          type: "funding",
          amount,
          sender: investorRole,
          receiver: entrepreneurRole,
          status: "completed",
          createdAt: new Date().toLocaleString(),
        },
        ...state.transactions,
      ],
    }));

    return true;
  },
}));
