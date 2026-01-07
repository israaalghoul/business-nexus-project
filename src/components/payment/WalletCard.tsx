import { usePaymentStore } from "../../store/paymentStore";
import { useAuth } from "../../context/AuthContext";

export const WalletCard = () => {
  const { user } = useAuth();
  const wallets = usePaymentStore((s) => s.wallets);

  if (!user) return null;

  const balance = usePaymentStore(
  (s) => s.wallets[user.role]
);

  return (
    <div className="bg-white p-5">
      <p className="text-sm text-gray-500">Wallet Balance</p>
      <h2 className="text-2xl font-bold mt-1">
        ${balance.toLocaleString()}
      </h2>
    </div>
  );
};


