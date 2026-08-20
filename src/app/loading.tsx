export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-gold" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone">Loading…</p>
      </div>
    </div>
  );
}
