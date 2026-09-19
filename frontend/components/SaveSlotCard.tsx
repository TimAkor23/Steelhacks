import type { SaveSlot } from "@/lib/types"

interface SaveSlotCardProps {
  slotNumber: number
  save: SaveSlot | null
  onSelect: (slotNumber: number) => void
  onDelete: (slotNumber: number) => void
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export default function SaveSlotCard({
  slotNumber,
  save,
  onSelect,
  onDelete,
}: SaveSlotCardProps) {
  const isEmpty = save === null

  return (
    <div
      className={`group relative flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-500/20 ${
        isEmpty
          ? "border-dashed border-slate-700 bg-slate-900/40"
          : "border-slate-800 bg-slate-900/80"
      }`}
    >
      {/* Soft emerald glow that appears on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 mb-3 flex items-center justify-between">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          {slotNumber}
        </span>
        {!isEmpty && (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
            Year {save.currentYear}
          </span>
        )}
      </div>

      {isEmpty ? (
        <button
          type="button"
          onClick={() => onSelect(slotNumber)}
          className="relative z-10 flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl py-6 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          {/* CSS-only life-slot symbol: a sprouting node on a line */}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-slate-600 text-2xl font-light text-slate-500 transition-all duration-200 group-hover:scale-110 group-hover:border-emerald-400/70 group-hover:text-emerald-400">
            +
            <span
              aria-hidden="true"
              className="absolute -bottom-3 h-3 w-px bg-slate-600 transition-colors group-hover:bg-emerald-400/60"
            />
          </span>
          <span className="text-base font-semibold text-slate-200 transition-colors group-hover:text-emerald-300">
            New Life
          </span>
          <span className="text-xs text-slate-500">Start a fresh story</span>
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onSelect(slotNumber)}
            className="relative z-10 flex flex-1 cursor-pointer flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 rounded-lg"
          >
            <h3 className="text-lg font-bold text-white">{save.characterName}</h3>
            <p className="text-sm text-slate-400">
              {save.occupation} · Age {save.age}
            </p>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-500">
                Net Worth
              </p>
              <p
                className={`mt-0.5 text-xl font-black ${
                  save.netWorth >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {currency.format(save.netWorth)}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onDelete(slotNumber)}
            className="relative z-10 mt-3 w-full rounded-lg border border-slate-800 py-2 text-sm font-medium text-slate-400 transition-colors hover:border-red-500/50 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}

