import { Resend } from "resend";
import { formatPrice } from "@/lib/utils";
import { site } from "@/lib/site";

type OrderConfirmationInput = {
  orderNumber: string;
  email: string;
  customerName: string;
  items: { productName: string; quantity: number; lineTotalCents: number }[];
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
};

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Sends the order confirmation via Resend when an API key is configured.
 * Without one (local/dev, no keys on file) it logs the same content to the
 * server console instead, so the checkout flow works end-to-end offline.
 */
export async function sendOrderConfirmationEmail(order: OrderConfirmationInput) {
  const lines = order.items
    .map((i) => `  ${i.quantity} x ${i.productName} — ${formatPrice(i.lineTotalCents)}`)
    .join("\n");

  const body = `Order ${order.orderNumber} confirmed for ${order.customerName} <${order.email}>

${lines}

Subtotal: ${formatPrice(order.subtotalCents)}
Shipping: ${order.shippingCents ? formatPrice(order.shippingCents) : "Complimentary"}
Tax: ${formatPrice(order.taxCents)}
Total: ${formatPrice(order.totalCents)}`;

  if (!resend) {
    console.log(`[email:mock] Order confirmation\n${body}`);
    return;
  }

  await resend.emails.send({
    from: site.email,
    to: order.email,
    subject: `Your ${site.name} order ${order.orderNumber} is confirmed`,
    text: body,
  });
}
