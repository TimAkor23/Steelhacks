import type { SaveSlot } from "../lib/types"
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
    <main className="ll-screen flex flex-col overflow-y-auto px-4 py-8 sm:px-6">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <header className="mb-8 flex flex-col items-center text-center">
          <span className="ll-brand ll-a1 mb-4">SAVE SLOTS</span>
          <p className="ll-eyebrow ll-a1 mb-3 uppercase">Your story starts here</p>
          <h1 className="ll-h1 ll-a2">Choose your story</h1>
          <p className="ll-a3 mt-4 text-sm font-semibold">
            Continue a life or begin a new one.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saves.map((save, index) => (
            <div
              key={index}
              className="ll-a4"
              style={{ animationDelay: `${0.35 + index * 0.1}s` }}
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

        <div className="mt-10 flex justify-center">
          <button type="button" onClick={onBack} className="ll-btn-primary">
            {"< Back to title"}
          </button>
        </div>
      </div>
    </main>
  )
}
