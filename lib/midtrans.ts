export async function createMidtransTransaction(input: { orderId: string; grossAmount: number; customerName?: string; customerEmail?: string; customerPhone?: string }) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) throw new Error("MIDTRANS_SERVER_KEY missing");

  const baseUrl = process.env.MIDTRANS_BASE_URL ?? "https://app.sandbox.midtrans.com";
  const response = await fetch(`${baseUrl}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
    },
    body: JSON.stringify({
      transaction_details: { order_id: input.orderId, gross_amount: input.grossAmount },
      customer_details: { first_name: input.customerName, email: input.customerEmail, phone: input.customerPhone },
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.status_message ?? "Midtrans transaction failed");
  return data as { token: string; redirect_url: string };
}
