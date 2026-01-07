import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { usePaymentStore } from "../../store/paymentStore";
import { WalletCard } from "../../components/payment/WalletCard";

export const PaymentsPage: React.FC = () => {
  const { deposit, withdraw, transfer, fundDeal, transactions } =
    usePaymentStore();

  const [amount, setAmount] = useState(0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Wallet */}
      <Card>
        <CardBody className="flex justify-between items-center">
          <WalletCard />
        </CardBody>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Payment Actions</h2>
        </CardHeader>
        <CardBody className="flex gap-3 flex-wrap">
          <input
            type="number"
            className="border p-2 rounded w-40"
            placeholder="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <Button onClick={() => deposit(amount)}>Deposit</Button>
          <Button variant="outline" onClick={() => withdraw(amount)}>
            Withdraw
          </Button>
          <Button
            variant="secondary"
            onClick={() => transfer("Partner Wallet", amount)}
          >
            Transfer
          </Button>
        </CardBody>
      </Card>

      {/* Funding Deal */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Funding Deal</h2>
        </CardHeader>
        <CardBody>
          <Button
            onClick={() =>  fundDeal("investor", "entrepreneur", amount)}>
            Fund Deal ($5,000)
          </Button>
        </CardBody>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Transaction History</h2>
        </CardHeader>
        <CardBody>
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left p-2">Type</th>
                <th>Amount</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t text-center">
                  <td className="p-2 text-left">{tx.type}</td>
                  <td>${tx.amount}</td>
                  <td>{tx.sender}</td>
                  <td>{tx.receiver}</td>
                  <td className="capitalize">{tx.status}</td>
                  <td>{tx.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};
