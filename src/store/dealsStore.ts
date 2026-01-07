import { create } from "zustand";

export interface Deal {
  id: number;
  startup: {
    name: string;
    logo: string;
    industry: string;
  };
  amount: string;
  equity: string;
  status: string;
  stage: string;
  lastActivity: string;

  targetAmount: number;
  fundedAmount: number;
}

interface DealsState {
  deals: Deal[];
  addFunding: (dealId: number, amount: number) => void;
  fundDeal: (dealId: number, amount: number) => void;
}

export const useDealsStore = create<DealsState>((set) => ({
  deals: [
    {
      id: 1,
      startup: {
        name: "TechWave AI",
        logo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        industry: "FinTech",
      },
      amount: "$1.5M",
      equity: "15%",
      status: "Due Diligence",
      stage: "Series A",
      lastActivity: "2024-02-15",
      targetAmount: 1500000,
      fundedAmount: 600000,
    },
    {
      id: 2,
      startup: {
        name: "GreenLife Solutions",
        logo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
        industry: "CleanTech",
      },
      amount: "$2M",
      equity: "20%",
      status: "Term Sheet",
      stage: "Seed",
      lastActivity: "2024-02-10",
      targetAmount: 2000000,
      fundedAmount: 2000000,
    },
    {
      id: 3,
      startup: {
        name: "HealthPulse",
        logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        industry: "HealthTech",
      },
      amount: "$800K",
      equity: "12%",
      status: "Negotiation",
      stage: "Pre-seed",
      lastActivity: "2024-02-05",
      targetAmount: 800000,
      fundedAmount: 150000,
    },
  ],

  addFunding: (dealId, amount) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              fundedAmount: deal.fundedAmount + amount,
              status:
                deal.fundedAmount + amount >= deal.targetAmount
                  ? "Closed"
                  : deal.status,
            }
          : deal
      ),
    })),

  fundDeal: (dealId, amount) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              fundedAmount: deal.fundedAmount + amount,
              status:
                deal.fundedAmount + amount >= deal.targetAmount
                  ? "Closed"
                  : deal.status,
            }
          : deal
      ),
    })),
}));
