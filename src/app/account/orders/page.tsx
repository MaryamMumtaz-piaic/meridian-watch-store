import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "text-stone bg-stone/10",
    PAID: "text-gold bg-gold/10",
    FULFILLED: "text-green-700 bg-green-50",
    CANCELLED: "text-red-700 bg-red-50",
    FAILED: "text-red-700 bg-red-50",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${colors[status] ?? "text-stone bg-stone/10"}`}
    >
      {status}
    </span>
  );
}

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
];

export const metadata = { title: "Order History" };

export default async function OrdersPage() {
  // TODO: Wire to NextAuth session — `const session = await auth()`
  // When session is available: prisma.order.findMany({ where: { userId: session.user.id }, ... })
  // For now, show an empty list rather than exposing all orders to unauthenticated visitors.
  const orders: Awaited<ReturnType<typeof prisma.order.findMany<{ include: { items: { include: { product: true } } } }>>> = [];

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-28 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 border-l-2 py-2.5 pl-4 text-sm transition-colors hover:border-gold hover:text-foreground ${
                link.href === "/account/orders"
                  ? "border-gold text-foreground font-medium"
                  : "border-transparent text-stone"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main>
        {/* Mobile nav */}
        <nav className="mb-8 flex gap-4 overflow-x-auto border-b border-hairline pb-4 lg:hidden">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 border-b-2 border-transparent pb-1 text-xs font-medium uppercase tracking-[0.12em] text-stone hover:border-gold hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="eyebrow">My Account</span>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Order History</h1>

        {orders.length === 0 ? (
          <div className="mt-12 border border-dashed border-hairline px-6 py-16 text-center">
            <p className="font-serif text-lg text-stone">No orders yet.</p>
            <p className="mt-2 text-sm text-stone/70">
              Your order history will appear here once you make your first purchase.
            </p>
            <Link
              href="/watches"
              className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => {
              const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
              return (
                <div
                  key={order.id}
                  className="border border-hairline bg-white p-6 transition-colors hover:border-gold/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-stone">Order</p>
                      <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                        #{order.orderNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stone">Date</p>
                      <p className="mt-0.5 text-sm text-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stone">Status</p>
                      <div className="mt-1">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-stone">Items</p>
                      <p className="mt-0.5 text-sm text-foreground">{itemCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone">Total</p>
                      <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                        {formatPriceCents(order.totalCents)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="text-xs font-medium uppercase tracking-[0.12em] text-gold hover:text-gold-bright"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>

                  {/* Item preview */}
                  {order.items.length > 0 && (
                    <div className="mt-4 border-t border-hairline pt-4">
                      <p className="text-xs text-stone">
                        {order.items
                          .slice(0, 2)
                          .map((i) => i.product.name)
                          .join(", ")}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
