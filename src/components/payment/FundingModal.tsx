import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useDealsStore } from "../../store/dealsStore";
import { usePaymentStore } from "../../store/paymentStore";
import { useAuth } from "../../context/AuthContext";

interface Props {
  dealId: number;
  maxAmount: number;
  onClose: () => void;
}

export const FundingModal: React.FC<Props> = ({
  dealId,
  maxAmount,
  onClose,
}) => {
  const [amount, setAmount] = useState(0);

  const fundDeal = usePaymentStore((s) => s.fundDeal);
  const addFunding = useDealsStore((s) => s.addFunding);
  const { user } = useAuth();

  const handleFund = () => {
    if (!user || user.role !== "investor") {
      alert("Only investors can fund deals");
      return;
    }

    const success = fundDeal("investor", "entrepreneur", amount);

    if (!success) {
      alert("Insufficient balance");
      return;
    }

    addFunding(dealId, amount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-lg font-semibold">Fund Deal</h2>

        <input
          type="number"
          max={maxAmount}
          className="w-full border p-2 rounded"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleFund}
            disabled={amount <= 0 || amount > maxAmount}
          >
            Confirm Funding
          </Button>
        </div>
      </div>
    </div>
  );
};
