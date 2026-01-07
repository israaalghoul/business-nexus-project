import { create } from "zustand";

interface Transaction {
  id: string;
  from: "investor";
  to: "entrepreneur";
  amount: number;
  date: string;
}

interface WalletState {
  balances: {
    investor: number;
    entrepreneur: number;
  };
  transactions: Transaction[];

  fundDeal: (amount: number) => boolean;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balances: {
    investor: 5_000_000,
    entrepreneur: 250_000,
  },

  transactions: [],

  fundDeal: (amount) => {
    const { balances } = get();

    if (balances.investor < amount) return false;

    set((state) => ({
      balances: {
        investor: state.balances.investor - amount,
        entrepreneur: state.balances.entrepreneur + amount,
      },
      transactions: [
        {
          id: crypto.randomUUID(),
          from: "investor",
          to: "entrepreneur",
          amount,
          date: new Date().toISOString(),
        },
        ...state.transactions,
      ],
    }));

    return true;
  },
}));
