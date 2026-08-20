import Link from "next/link";
import { formatPriceCents } from "@/lib/format";

// TODO: Replace with real session from NextAuth
const DEMO_USER = {
  name: "Jane Collector",
  email: "jane@example.com",
  createdAt: new Date("2024-01-15"),
};

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

export default async function AccountPage() {
  // TODO: Wire to NextAuth session — `const session = await auth()`
  // Until auth is configured, we show an empty dashboard rather than leaking all orders.
  // When session is available: prisma.order.findMany({ where: { userId: session.user.id } })
  const recentOrders: { id: string; orderNumber: string; createdAt: Date; status: string; totalCents: number }[] = [];
  const orderCount = 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-28 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 border-l-2 border-transparent py-2.5 pl-4 text-sm text-stone transition-colors hover:border-gold hover:text-foreground data-active:border-gold data-active:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="flex w-full items-center gap-3 border-l-2 border-transparent py-2.5 pl-4 text-sm text-stone transition-colors hover:border-red-400 hover:text-red-600"
          >
            Sign Out
          </button>
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
        <h1 className="mt-4 font-serif text-3xl text-foreground">
          Welcome back, {DEMO_USER.name.split(" ")[0]}.
        </h1>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 border border-hairline">
          <div className="border-r border-hairline px-6 py-5">
            <p className="font-mono text-2xl font-bold text-foreground">{orderCount}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone">Orders placed</p>
          </div>
          <div className="border-r border-hairline px-6 py-5">
            <p className="font-mono text-2xl font-bold text-foreground">0</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone">Wishlist items</p>
          </div>
          <div className="px-6 py-5">
            <p className="font-mono text-2xl font-bold text-foreground">
              {DEMO_USER.createdAt.getFullYear()}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone">Member since</p>
          </div>
        </div>

        {/* Recent orders */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-foreground">Recent Orders</h2>
            <Link
              href="/account/orders"
              className="text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-gold"
            >
              View all →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="mt-6 border border-dashed border-hairline px-6 py-12 text-center">
              <p className="text-sm text-stone">No orders yet.</p>
              <Link
                href="/watches"
                className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-bright"
              >
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-stone">
                      Order
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-stone">
                      Date
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-stone">
                      Status
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-[0.12em] text-stone">
                      Total
                    </th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-4 font-mono text-xs text-foreground">
                        #{order.orderNumber}
                      </td>
                      <td className="py-4 text-xs text-stone">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 text-right font-mono text-xs text-foreground">
                        {formatPriceCents(order.totalCents)}
                      </td>
                      <td className="py-4 text-right">
                        <Link
                          href={`/account/orders/${order.id}`}
                          className="text-xs text-gold hover:text-gold-bright"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
