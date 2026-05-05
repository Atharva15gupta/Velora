import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment & Subscription",
  description: "Manage your Velora subscription securely to unlock advanced AI support features and extended usage.",
};

import { PaymentView } from '@/views/auth/payment'

const Payment = () => {
  return (
    <PaymentView />
  )
}

export default Payment
