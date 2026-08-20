import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Address Book" };

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
];

export default async function AddressesPage() {
  // TODO: Fetch real addresses for authenticated user via prisma.address.findMany({ where: { userId } })
  const addresses: {
    id: string;
    line1: string;
    line2?: string | null;
    city: string;
    region?: string | null;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[] = [];

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
                link.href === "/account/addresses"
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

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">My Account</span>
            <h1 className="mt-4 font-serif text-3xl text-foreground">Address Book</h1>
          </div>
          <button
            type="button"
            className="mt-6 shrink-0 border border-foreground bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold"
          >
            Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="mt-10 border border-dashed border-hairline px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-hairline">
              <svg
                className="h-5 w-5 text-stone"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <p className="font-serif text-lg text-stone">No saved addresses</p>
            <p className="mt-2 text-sm text-stone/70">
              Add an address to speed up checkout.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold"
            >
              Add New Address
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="relative border border-hairline bg-white p-6"
              >
                {address.isDefault && (
                  <span className="mb-3 inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10">
                    Default
                  </span>
                )}
                <address className="not-italic text-sm text-foreground leading-relaxed">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {[address.city, address.region].filter(Boolean).join(", ")}{" "}
                    {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </address>
                <div className="mt-4 flex gap-3 border-t border-hairline pt-4">
                  <button
                    type="button"
                    className="text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-gold"
                  >
                    Edit
                  </button>
                  <span className="text-stone/30">·</span>
                  <button
                    type="button"
                    className="text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-red-600"
                  >
                    Delete
                  </button>
                  {!address.isDefault && (
                    <>
                      <span className="text-stone/30">·</span>
                      <button
                        type="button"
                        className="text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-gold"
                      >
                        Set as Default
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
