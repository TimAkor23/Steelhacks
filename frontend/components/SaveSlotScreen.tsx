import type { SaveSlot } from "@/lib/types"
import SaveSlotCard from "./SaveSlotCard"

interface SaveSlotScreenProps {
  saves: SaveSlot[]
  onSelectSlot: (slotNumber: number) => void
  onDeleteSlot: (slotNumber: number) => void
  onBack: () => void
}

export default function SaveSlotScreen({
  saves,
  onSelectSlot,
  onDeleteSlot,
  onBack,
}: SaveSlotScreenProps) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-y-auto bg-slate-950 px-5 py-8 sm:px-6 sm:py-10">
      <style>{`
        @keyframes ll-card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ll-head-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ll-head-in { opacity: 0; animation: ll-head-in 0.5s ease-out forwards; }
        .ll-card-in { opacity: 0; animation: ll-card-in 0.55s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ll-head-in, .ll-card-in { animation: none; opacity: 1; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.1),_transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <div className="ll-head-in mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="pt-1">
            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
              Save Slots
            </span>
            <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Choose Your Story
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Continue a life or begin a new one.
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 sm:self-auto"
          >
            <span aria-hidden="true">←</span> Back
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {saves.map((save, index) => (
            <div
              key={index}
              className="ll-card-in"
              style={{ animationDelay: `${0.1 + index * 0.12}s` }}
            >
              <SaveSlotCard
                slotNumber={index + 1}
                save={save}
                onSelect={onSelectSlot}
                onDelete={onDeleteSlot}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
