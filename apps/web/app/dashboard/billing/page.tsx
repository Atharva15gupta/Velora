import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your subscription, view limits, and invoices.",
};

const BillingPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details.</p>
      </div>
      <div className="border rounded-xl bg-card p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Current Plan: Free</h2>
        <p className="text-sm text-muted-foreground">You are currently on the free plan. Upgrade to unlock more features.</p>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-fit">Upgrade Plan</button>
      </div>
    </div>
  );
};

export default BillingPage;
