import { axiosInstance } from "../axios";

export const getSubscriptionDetails = async () => {
    const response = await axiosInstance.get("/subscription/details");
    return response.data;
};

export const createCheckoutSession = async ({
  plan,
}: {
  plan: "STARTER" | "PRO";
}) => {
  const response = await axiosInstance.post("/subscription/billing/create-checkout", {
    plan,
  });
  return response.data as { subscriptionId: string };
};
